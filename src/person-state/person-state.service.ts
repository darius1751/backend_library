import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonStateDto } from './dto/create-person-state.dto';
import { PersonState } from './entities/person-state.entity';

@Injectable()
export class PersonStateService {
  
  constructor(@InjectRepository(PersonState) private personStateRepository:Repository<PersonState>){}
  
  async create(createPersonStateDto: CreatePersonStateDto) {
    try{
      const newPersonState = this.personStateRepository.create(createPersonStateDto);
      if(newPersonState)
        return newPersonState;
    }catch(exception){
      throw new BadRequestException(`Name exist in DB`);
    }
    
  }

  findAll() {
    try{
      return this.personStateRepository.find();
    }catch(exception){
      throw new InternalServerErrorException(`Find All fail exception: ${exception.message}`)
    }
    
  }

  
  
}
