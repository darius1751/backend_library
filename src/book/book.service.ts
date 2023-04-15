import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  StreamableFile,
} from '@nestjs/common';
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
    private authorService: AuthorService,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const { authorId, ...createBook } = createBookDto;
    try {
      return await this.bookRepository.save({
        ...createBook,
        author: {
          id: authorId,
        },
      });
    } catch (exception) {
      throw new InternalServerErrorException(
        `Error in create book: ${exception.message}`,
      );
    }
  }
  async findFrontPageByCode(code: string) {
    try {
      const { frontPage } = await this.findOneByCode(code);
      const path = join(__dirname, '..', '..', 'images', 'books', frontPage);
      if (existsSync(path)) {
        const file = createReadStream(path);
        return new StreamableFile(file);
      }
      throw new BadRequestException(join('books', 'error.png'));
    } catch (exception) {}
  }
  async findFlex(skip: number, take: number, query: string) {
    try {
      const [books, totalRegisters] = await this.bookRepository
        .createQueryBuilder('b')
        .leftJoin('categories_x_book', 'cxb', `cxb.bookId = b.id`)
        .leftJoin(Category, 'c', `c.id = cxb.categoryId`)
        .leftJoin(Author, 'a', `a.id = b.author_id`)
        .where(
          `a.name LIKE :authorName OR c.name LIKE :categoryName OR b.title LIKE :bookTitle`,
          {
            authorName: `%${query}%`,
            categoryName: `%${query}%`,
            bookTitle: `%${query}%`,
          },
        )
        .skip(skip)
        .take(take)
        .getManyAndCount();
      const booksResponse = books.map((book) => {
        delete book.frontPage;
        return { ...book };
      });
      return {
        books: booksResponse,
        pagination: generatePagination(skip, take, totalRegisters),
      };
    } catch (exception) {
      console.log(exception.sql);
      return { error: exception.message };
    }
  }

  async findAll(skip: number, take: number) {
    const [books, totalRegisters] = await this.bookRepository.findAndCount({
      order: {
        title: 'ASC',
      },
      select: {
        frontPage: false,
      },
      relations: {
        author: true,
        categories: true,
      },
      skip,
      take,
    });
    return {
      books,
      pagination: generatePagination(skip, take, totalRegisters),
    };
  }

  async findOneById(id: string) {
    const book = await this.bookRepository.findOne({
      where: { 
        id 
      },
      select: { 
        frontPage: false 
      },
    });
    if (book) return book;
    throw new BadRequestException(`Not exist book with id: ${id}`);
  }

  async findOneByCode(code: string) {
    const book = await this.bookRepository.findOne({
      where: { 
        code 
      },
      select: { 
        frontPage: false 
      },
    });
    if (book) return book;
    throw new BadRequestException(`Not exist book with code: ${code}`);
  }

  findAllByCategoryName(name: string) {
    return this.bookRepository.find({
      where: { 
        categories: { 
          name 
        } 
      },
      select: { 
        frontPage: false 
      },
    });
  }

  async findAllByAuthorId(id: string) {
    await this.authorService.findOneById(id);
    return await this.bookRepository.find({
      where: { 
        author: { 
          id 
        } 
      },
      select: { 
        frontPage: false 
      },
    });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    await this.findOneById(id);
    try {
      return await this.bookRepository.update({ id }, updateBookDto);
    } catch (exception) {
      throw new InternalServerErrorException(
        `Error in update book ${exception.message}`,
      );
    }
  }
}
