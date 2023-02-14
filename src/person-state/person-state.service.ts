import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonStateDto } from './dto/create-person-state.dto';
import { PersonState } from './entities/person-state.entity';

@Injectable()
export class PersonStateService {

  constructor(@InjectRepository(PersonState) private personStateRepository: Repository<PersonState>) { }

  async create(createPersonStateDto: CreatePersonStateDto) {
    try {
      const { generatedMaps } = await this.personStateRepository.insert(createPersonStateDto);
      const { id } = generatedMaps[0];
      return await this.findOneById(id);
    } catch (exception) {
      const { code } = exception;
      if (code === 'ER_DUP_ENTRY')
        throw new BadRequestException(`personState:  ${createPersonStateDto.name} exist in DB`);
    }

  }

  async findOneById(id: string) {
    const personState = await this.personStateRepository.findOneBy({ id });
    if (personState)
      return personState;
    throw new BadRequestException(`Not exist personState with id: ${id}`);
  }

  findAll() {
    try {
      return this.personStateRepository.find();
    } catch (exception) {
      throw new InternalServerErrorException(`Find All fail exception: ${exception.message}`)
    }

  }



}
