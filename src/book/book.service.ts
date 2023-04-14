import { BadRequestException, Injectable, InternalServerErrorException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import { AuthorService } from 'src/author/author.service';
import { Author } from 'src/author/entities/author.entity';
import { Category } from 'src/category/entities/category.entity';
import { generatePagination } from 'src/common/helpers/generatePagination';
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
    const { authorId, ...createBook } = createBookDto;
    try {
      return await this.bookRepository.save({
        ...createBook,
        author:{
          id: authorId
        }                
      });
    } catch (exception) {
      throw new InternalServerErrorException(`Error in create book: ${exception.message}`);
    }

  }
  findFrontPageByCode(codeWithExtension: string){
    
      const path = join(__dirname,'..','..','images','books',codeWithExtension);
      if(existsSync(path)){
        const file = createReadStream(path)
        return new StreamableFile(file);
      }
      throw new BadRequestException(join('books','error.png'));   
  }
  async findFlex(skip: number, take: number, query: string){
    try{
      const [books, totalRegisters ] = await this.bookRepository
      .createQueryBuilder('b')
      .leftJoin('categories_x_book', 'cxb',`cxb.bookId = b.id`)
      .leftJoin(Category,'c',`c.id = cxb.categoryId`)
      .leftJoin(Author,'a',`a.id = b.author_id`)
      .where(`a.name LIKE :authorName OR c.name LIKE :categoryName OR b.title LIKE :bookTitle`,{ 
        authorName: `%${query}%`,
        categoryName: `%${query}%`,
        bookTitle: `%${query}%`
      })
    .skip(skip)
    .take(take)
    .getManyAndCount()
    return {
      books, 
      pagination: generatePagination(skip, take, totalRegisters)
    };
    }catch(exception){
      console.log(exception.sql);
      return {error:exception.message};
    }
  }

  async findAll(skip: number, take: number) {
    const [books, totalRegisters] = await  this.bookRepository.findAndCount({
      order: {
        title: 'ASC'
      },
      skip,
      take
    });
    return {
      books, 
      pagination: generatePagination(skip, take, totalRegisters)
    };
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
    return await this.bookRepository.findBy({ author: { id } });
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
