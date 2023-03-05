import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { generatePagination } from 'src/common/helpers/generatePagination';
import { LoanService } from 'src/loan/loan.service';
import { PersonService } from 'src/person/person.service';
import { Repository } from 'typeorm';
import { CreateRenewalDto } from './dto/create-renewal.dto';
import { UpdateRenewalDto } from './dto/update-renewal.dto';
import { Renewal } from './entities/renewal.entity';

@Injectable()
export class RenewalService {

  constructor(
    @InjectRepository(Renewal) private renewalRepository: Repository<Renewal>,
    private personService: PersonService,
    private loanService: LoanService,
    private configService: ConfigService,

  ) { }

  async create(createRenewalDto: CreateRenewalDto) {
    const { loanId } = createRenewalDto;
    const loan = await this.loanService.findOneById(loanId);
    const { person } = loan;
    await this.loanService.isActive(loanId);
    await this.personService.isActive(person.id);
    const countRenewals = await this.getCountRenewalsOfLoan(loanId);
    const limitRenewals = +this.configService.get<number>('LIMIT_RENEWALS');
    if (countRenewals == limitRenewals)
      throw new InternalServerErrorException(`Error, limit renewals reached, countRenewals: ${countRenewals}`);

    const additionalLimit = +this.configService.get<number>('ADDITIONAL_LIMIT_LOAN_IN_DAYS');
    const newReturnDate = new Date();
    newReturnDate.setDate(newReturnDate.getDate() + additionalLimit);
    await this.loanService.update(loanId, {
      returnDate: newReturnDate.toJSON()
    });
    return await this.renewalRepository.save({
      newReturnDate: newReturnDate.toJSON(),
      loan: {
        id: loanId
      }
    })
  }

  async findAll(skip: number, take: number) {
    const [renewals, totalRegisters] = await this.renewalRepository.findAndCount({
      skip,
      take,
      order: {
        createdAt: 'DESC'
      }
    });
    return {
      renewals,
      pagination: generatePagination(skip, take, totalRegisters)
    }
  }

  async findOneById(id: string) {
    const renewal = await this.renewalRepository.findOneBy({ id });
    if (renewal)
      return renewal;
    throw new BadRequestException(`Not exist renewal with id: ${id}`);
  }

  async getCountRenewalsOfLoan(loanId: string): Promise<number> {
    return await this.renewalRepository.countBy({
      loan: {
        id: loanId
      }
    });
  }
}
