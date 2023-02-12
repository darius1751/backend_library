import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDevolutionStateDto } from './dto/create-devolution-state.dto';
import { DevolutionState } from './entities/devolution-state.entity';

@Injectable()
export class DevolutionStateService {

  constructor(
    @InjectRepository(DevolutionState) private devolutionStateRepository:Repository<DevolutionState>
  ){}

  create(createDevolutionStateDto: CreateDevolutionStateDto) {
    try{
      return this.devolutionStateRepository.create(createDevolutionStateDto);
    }catch(exception){
      throw new InternalServerErrorException(`Error in create devolutionState, Exception: ${exception}`);
    }
    
  }

  findAll() {
    return this.devolutionStateRepository.find();
  }

 
}
