import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDevolutionStateDto } from './dto/create-devolution-state.dto';
import { DevolutionState } from './entities/devolution-state.entity';

@Injectable()
export class DevolutionStateService {

  constructor(
    @InjectRepository(DevolutionState) private devolutionStateRepository:Repository<DevolutionState>
  ){}

  async create(createDevolutionStateDto: CreateDevolutionStateDto) {
    try{
      return await this.devolutionStateRepository.save(createDevolutionStateDto);
    }catch(exception){
      throw new InternalServerErrorException(`Error in create devolutionState, Exception: ${exception}`);
    }
    
  }

  async findOneById( id:string ){
    const devolutionState = await this.devolutionStateRepository.findOneBy({id});
    if(devolutionState)
      return devolutionState;
    throw new BadRequestException(`Not exist devolutionState with id: ${id}`);
  }

  findAll() {
    return this.devolutionStateRepository.find();
  }

  

 
}
