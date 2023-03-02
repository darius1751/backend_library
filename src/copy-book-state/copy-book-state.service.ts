import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCopyBookStateDto } from './dto/create-copy-book-state.dto';
import { CopyBookState } from './entities/copy-book-state.entity';

@Injectable()
export class CopyBookStateService {

  constructor(@InjectRepository(CopyBookState) private copyBookStateRepository: Repository<CopyBookState>) { }

  async create(createCopyBookStateDto: CreateCopyBookStateDto) {
    try {
      return await this.copyBookStateRepository.save(createCopyBookStateDto);
    } catch (exception) {
      throw new InternalServerErrorException(`Error in create copyBookState, Exception: ${exception.message}`);
    }

  }
  async findOne(id: string){
    const copyBookState = await this.copyBookStateRepository.findOneBy({id});
    if(copyBookState)
      return copyBookState;
    throw new BadRequestException(`Not exist copyBookState with id: ${id}`);
  }
  async findIdByName(name: string){
    const copyBookState = await this.copyBookStateRepository.findOneBy({name});
    console.log({copyBookState});
    if(copyBookState)
      return copyBookState.id;
    throw new BadRequestException(`Not exist copyBookState with name: ${name}`);
  }

  findAll() {
    return this.copyBookStateRepository.find();
  }

}
