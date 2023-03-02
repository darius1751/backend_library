import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLoanStateDto } from './dto/create-loan-state.dto';
import { LoanState } from './entities/loan-state.entity';

@Injectable()
export class LoanStateService {
  
  constructor(@InjectRepository(LoanState) private loanStateRepository:Repository<LoanState>){}
  
  async create(createLoanStateDto: CreateLoanStateDto) {
    try{
      return await this.loanStateRepository.save(createLoanStateDto);
    }catch(exception){
      throw new BadRequestException(`Error in create loadState: ${exception}`);
    }
    
  }
  
  async findIdByName(name: string){
    const loan = await this.loanStateRepository.findOneBy({name});
    if(loan)
      return loan.id;
    throw new BadRequestException(`Not exist loanState with name: ${name}`);
  }

  async findOneById(id:string){
    const loanState = await this.loanStateRepository.findOneBy({id})
    if(loanState)
      return loanState;
    throw new BadRequestException(`Not exist loanState with id: ${id}`);
  }

  findAll() {
    try{
      return this.loanStateRepository.find();
    }catch(exception){
      throw new InternalServerErrorException(`${exception.message}`);
    }
  }

  

}
