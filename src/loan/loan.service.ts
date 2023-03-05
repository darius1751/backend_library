import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CopyBookService } from 'src/copy-book/copy-book.service';
import { generatePagination } from 'src/common/helpers/generatePagination';
import { LoanStateService } from 'src/loan-state/loan-state.service';
import { PersonService } from 'src/person/person.service';
import { Repository } from 'typeorm';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { Loan } from './entities/loan.entity';


@Injectable()
export class LoanService {

  constructor(
    @InjectRepository(Loan) private loanRepository: Repository<Loan>,
    private personService: PersonService,
    private copyBookService: CopyBookService,
    private loanStateService: LoanStateService,
    private configService: ConfigService
  ) { }

  async create(createLoanDto: CreateLoanDto) {
    const { copyBookId, personId } = createLoanDto;
    this.personService.isActive(personId);
    this.copyBookService.isAvailable(copyBookId);
    this.copyBookService.updateToLoan(copyBookId);
    const ACTIVE_LOAN_STATE = this.configService.get<string>('ACTIVE_LOAN_STATE');
    const loanStateId = await this.loanStateService.findIdByName(ACTIVE_LOAN_STATE);
    const returnDate = new Date();
    const limitActiveLoanInDays: number = +this.configService.get<number>('LIMIT_ACTIVE_LOAN_IN_DAYS');
    const newDate = returnDate.getDate() + limitActiveLoanInDays;
    returnDate.setDate(newDate);
    return await this.loanRepository.save({
      copyBook: {
        id: copyBookId
      },
      person: {
        id: personId
      },
      loanState: {
        id: loanStateId
      },
      returnDate: returnDate.toJSON()
    });
  }

  async findAll(skip: number, take: number) {
    const [loans, totalRegisters] = await this.loanRepository.findAndCount({
      skip,
      take,
      order: {
        createdAt: 'DESC'
      }
    });
    return {
      loans,
      pagination: generatePagination(skip, take, totalRegisters)
    }
  }
  async isActive(id: string) {
    const activeLoanState = this.configService.get<string>('ACTIVE_LOAN_STATE');
    const activeLoanStateId = await this.loanStateService.findIdByName(activeLoanState);
    const loan = await this.findOneById(id);
    const { loanState } = loan;
    if (loanState.id !== activeLoanStateId)
      throw new BadRequestException(`The loan ${id} not is active`);

  }


  async findAllByPersonId(id: string, skip: number, take: number) {
    await this.personService.findOneById(id);
    try {
      const [loans, totalRegisters] = await this.loanRepository.findAndCount({
        where: {
          person: { id }
        },
        order: {
          createdAt: 'DESC'
        },
        skip,
        take
      });
      return {
        loans,
        pagination: generatePagination(skip, take, totalRegisters)
      }
    } catch (exception) {
      throw new InternalServerErrorException(`Error in findAllByPersonId: ${exception.message}`);
    }
  }

  async findOneById(id: string) {
    const loan = this.loanRepository.findOne({
      where: {
        id
      },
      relations: {
        loanState: true,
        copyBook: true,
        person: true
      }
    });
    if (loan)
      return loan;
    throw new BadRequestException(`Not exist loan with id: ${id}`);
  }
  
  async notIsDelivered(id: string){
    const loan = await this.findOneById(id);
    const COMPLETE_LOAN_STATE = this.configService.get<string>('COMPLETE_LOAN_STATE');
    const completeLoanStateId = await this.loanStateService.findIdByName(COMPLETE_LOAN_STATE);
    const DEFEATED_DELIVERED_LOAN_STATE = this.configService.get<string>('DEFEATED_DELIVERED_LOAN_STATE');
    const defeatedDeliveredStateId = await this.loanStateService.findIdByName(DEFEATED_DELIVERED_LOAN_STATE);
    const { loanState } = loan;
    if(loanState.id === completeLoanStateId || loan.id === defeatedDeliveredStateId)
      throw new ForbiddenException(`Not is valid delivered`);
  }
  async updateForDevolution( id: string ){
    const loan = await this.findOneById(id);
    const today = new Date().toJSON().slice(0, 10);
    const { returnDate } = loan;
    if( today > returnDate){
      const DEFEATED_DELIVERED_LOAN_STATE = this.configService.get<string>('DEFEATED_DELIVERED_LOAN_STATE');
      const defeatedDeliveredStateId = await this.loanStateService.findIdByName(DEFEATED_DELIVERED_LOAN_STATE);
      this.update(id, { 
        loanStateId: defeatedDeliveredStateId
      })
    } else {
      const COMPLETE_LOAN_STATE = this.configService.get<string>('COMPLETE_LOAN_STATE');
      const completeLoanStateId = await this.loanStateService.findIdByName(COMPLETE_LOAN_STATE);
      this.update(id, { 
        loanStateId: completeLoanStateId
      })
    }
      
    
  }

  async update(id: string, updateLoanDto: UpdateLoanDto) {
    await this.findOneById(id);

    try {
      const { copyBookId, personId, loanStateId } = updateLoanDto;
      return await this.loanRepository.update({ id }, {
        copyBook: {
          id: copyBookId
        },
        person: {
          id: personId
        }
      });
    } catch (exception) {
      throw new InternalServerErrorException(`Error in update loan ${exception.message}`)
    }
  }
}
