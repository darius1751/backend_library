import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonService } from 'src/person/person.service';
import { Repository } from 'typeorm';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { Loan } from './entities/loan.entity';


@Injectable()
export class LoanService {

  constructor(
    @InjectRepository(Loan) private loanRepository: Repository<Loan>,
    private personService: PersonService
  ) { }

  async create(createLoanDto: CreateLoanDto) {
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 7);
    const { copyBookId, personId } = createLoanDto;
    const { generatedMaps } = await this.loanRepository.insert({
      copyBook: {
        id: copyBookId
      },
      person: {
        id: personId
      },
      returnDate: returnDate.toJSON()
    });
    const { id } = generatedMaps[0];
    return await this.findOneById(id);
  }

  findAll(skip: number, take: number) {
    return this.loanRepository.find({
      skip,
      take,
      order: {
        createdAt: 'ASC'
      }
    });
  }

  async findAllByPersonId(id: string, skip: number, take: number) {
    await this.personService.findOneById(id);
    try {
      return await this.loanRepository.find({
        where: {
          person: { id }
        },
        order: {
          createdAt: 'ASC'
        },
        skip,
        take
      })
    } catch (exception) {
      throw new InternalServerErrorException(`Error in findAllByPersonId: ${exception.message}`);
    }
  }

  async findOneById(id: string) {
    const loan = this.loanRepository.findOneBy({ id });
    if (loan)
      return loan;
    throw new BadRequestException(`Not exist loan with id: ${id}`);
  }

  async update(id: string, updateLoanDto: UpdateLoanDto) {
    await this.findOneById(id);
    try {
      const { copyBookId, personId } = updateLoanDto;
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
