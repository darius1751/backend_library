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
      const { generatedMaps } = await this.copyBookStateRepository.insert(createCopyBookStateDto);
      const { id } = generatedMaps[0];
      return await this.findOne(id);
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
  findAll() {
    return this.copyBookStateRepository.find();
  }

}
