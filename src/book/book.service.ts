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
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';
import { generatePagination } from 'src/common/helpers/generatePagination';
import { Repository } from 'typeorm';
import { AddCategoryDTO } from './dto/add-category-dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    private authorService: AuthorService,
    private categoryService: CategoryService
  ) { }

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
      console.log({ exception });
      const { code } = exception;
      if (code === 'ER_NO_DEFAULT_FOR_FIELD')
        throw new BadRequestException(
          `Error in create book: ${exception.sqlMessage}`,
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
      throw new BadRequestException('books');
    } catch (exception) {
      throw new BadRequestException('books');
    }
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
      const booksResponse: Book[] = [];
      for (const book of books) {
        booksResponse.push(await this.findOneById(book.id));
      }

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
        frontPage: false
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
      relations: {
        author: true,
        categories: true
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

  async findAllByCategoryName(skip: number, take: number, name: string) {
    const [books, totalRegisters] = await this.bookRepository.findAndCount({
      where: {
        categories: {
          name
        }
      },
      select: {
        frontPage: false
      },
    });
    return {
      books,
      pagination: generatePagination(skip, take, totalRegisters)
    }
  }

  async findAllByAuthorId(skip: number, take: number, id: string) {
    await this.authorService.findOneById(id);
    const [books, totalRegisters] = await this.bookRepository.findAndCount({
      where: {
        author: {
          id
        }
      },
      select: {
        frontPage: false
      },
    });
    return {
      books,
      pagination: generatePagination(skip, take, totalRegisters)
    }
  }
  async addCategories(id: string, addCategoriesDto: AddCategoryDTO) {
    await this.findOneById(id);
    const { categories } = addCategoriesDto;
    for (const categoryId of categories) {
      await this.categoryService.findOneById(categoryId);
    }
    const categoriesId: any[] = categories.map((id) => ({ id }));
    try {
      return await this.bookRepository.save({ id, categories: categoriesId });
    } catch (exception) {
      console.log({ exception });
      return { ok: false }
    }
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
