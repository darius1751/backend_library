import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLoanStateDto } from './dto/create-loan-state.dto';
import { LoanState } from './entities/loan-state.entity';

@Injectable()
export class LoanStateService {
  
  constructor(@InjectRepository(LoanState) private loanStateRepository:Repository<LoanState>){}
  
  create(createLoanStateDto: CreateLoanStateDto) {
    try{
      return this.loanStateRepository.create(createLoanStateDto);
    }catch(exception){
      throw new BadRequestException(`Error in create loadState: ${exception}`);
    }
    
  }

  findAll() {
    try{
      return this.loanStateRepository.find();
    }catch(exception){
      throw new InternalServerErrorException(`${exception.message}`);
    }
    
  }

}
