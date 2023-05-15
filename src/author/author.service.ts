import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generatePagination } from 'src/common/helpers/generatePagination';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {

  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>
  ) { }

  async create(createAuthorDto: CreateAuthorDto) {
    try {
      return await this.authorRepository.save(createAuthorDto);
    } catch (exception) {
      const { code } = exception;
      if (code === 'ER_DUP_ENTRY')
        throw new BadRequestException(`Author ${createAuthorDto.name} exist in DB`);
    }

  }

  async findAll() {
    return await this.authorRepository.find();    
  }

  async findOneById(id: string) {
    const author = await this.authorRepository.findOneBy({ id });
    if (author)
      return author;
    throw new BadRequestException(`Author with id: ${id} not exist`);

  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    await this.findOneById(id);
    try {
      return await this.authorRepository.update({ id }, updateAuthorDto);
    } catch (exception) {
      throw new InternalServerErrorException(`Error to update Author, exception: ${exception.message}`);
    }
  }
}
