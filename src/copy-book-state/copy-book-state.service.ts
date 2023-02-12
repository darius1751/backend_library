import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCopyBookStateDto } from './dto/create-copy-book-state.dto';
import { CopyBookState } from './entities/copy-book-state.entity';

@Injectable()
export class CopyBookStateService {

  constructor(@InjectRepository(CopyBookState) private copyBookStateRepository:Repository<CopyBookState>){}

  create(createCopyBookStateDto: CreateCopyBookStateDto) {
    try{
      return this.copyBookStateRepository.create(createCopyBookStateDto);
    }catch(exception){
      throw new InternalServerErrorException(`Error in create copyBookState, Exception: ${exception.message}`);
    }
    
  }

  findAll() {
    return this.copyBookStateRepository.find();
  }

}
