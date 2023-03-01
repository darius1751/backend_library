import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { generatePagination } from 'src/helpers/generatePagination';
import { LoanService } from 'src/loan/loan.service';
import { Repository } from 'typeorm';
import { CreateRenewalDto } from './dto/create-renewal.dto';
import { UpdateRenewalDto } from './dto/update-renewal.dto';
import { Renewal } from './entities/renewal.entity';

@Injectable()
export class RenewalService {

  constructor(
    @InjectRepository(Renewal) private renewalRepository: Repository<Renewal>,
    private configService: ConfigService,
    private loanService: LoanService    
  ){}
  
  async create(createRenewalDto: CreateRenewalDto) {
    const { loanId, newReturnDate } = createRenewalDto;
    const loan = await this.loanService.findOneById(loanId);
    
  }

  async findAll(skip: number, take: number) {
    const [renewals, totalRegisters] = await this.renewalRepository.findAndCount({
      skip,
      take,
      order:{
        createdAt:'DESC'
      }
    });
    return {
      renewals,
      pagination: generatePagination(skip, take, totalRegisters)
    }
  }

  async findOneById(id: string) {
    const renewal = await this.renewalRepository.findOneBy({id});
    if(renewal)
      return renewal;
    throw new BadRequestException(`Not exist renewal with id: ${id}`);
  }
  
  async getCountRenewalsOfLoan(loanId: string): Promise<number>{
    return await this.renewalRepository.countBy({
      loan:{
        id: loanId
      }
    });
  }

  update(id: string, updateRenewalDto: UpdateRenewalDto) {
    return `This action updates a #${id} renewal`;
  }
}
