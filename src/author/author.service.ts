import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  
  constructor(
    @InjectRepository(Author) private authorRepository:Repository<Author>
  ){}

  create(createAuthorDto: CreateAuthorDto) {
    try{
      return this.authorRepository.create(createAuthorDto);
    }catch(exception){
      throw new InternalServerErrorException(`Error in create author: ${exception}`);
    }
    
  }

  findAll() {
    return this.authorRepository.find();
  }

  async findOne(id: string) {
      const author = await this.authorRepository.findOneBy({id});
      if(author)
        return author;
      throw new BadRequestException(`Author with id: ${id} not exist`);
    
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    await this.findOne(id);
    try{
      return await this.authorRepository.update({id}, updateAuthorDto);  
    }catch(exception){
      throw new InternalServerErrorException(`Error to update Author, exception: ${exception.message}`);
    }      
  }
}
