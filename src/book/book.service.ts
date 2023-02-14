import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorService } from 'src/author/author.service';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {

  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    private authorService: AuthorService
  ) { }

  async create(createBookDto: CreateBookDto) {
    try {
      const { generatedMaps } = await this.bookRepository.insert(createBookDto);
      const { id } = generatedMaps[0];
      return await this.findOneById(id);
    } catch (exception) {
      throw new InternalServerErrorException(`Error in create book: ${exception.message}`);
    }

  }

  findAll(skip: number, take: number) {
    return this.bookRepository.find({
      order: {
        title: 'ASC'
      },
      skip,
      take
    });
  }

  async findOneById(id: string) {
    const book = await this.bookRepository.findOneBy({ id });
    if (book)
      return book;
    throw new BadRequestException(`Not exist book with id: ${id}`);
  }

  async findOneByCode(code: string) {
    const book = await this.bookRepository.findOneBy({ code });
    if (book)
      return book;
    throw new BadRequestException(`Not exist book with code: ${code}`);
  }

  findAllByCategoryName(name: string) {
    return this.bookRepository.findBy({ categories: { name } });
  }

  async findAllByAuthorId(id: string) {
    await this.authorService.findOneById(id);
    return await this.bookRepository.findOneBy({ author: { id } });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    await this.findOneById(id);
    try {
      return await this.bookRepository.update({ id }, updateBookDto);
    } catch (exception) {
      throw new InternalServerErrorException(`Error in update book ${exception.message}`);
    }
  }
}
