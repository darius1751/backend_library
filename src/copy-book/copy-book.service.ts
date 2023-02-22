import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookService } from 'src/book/book.service';
import { Repository } from 'typeorm';
import { CreateCopyBookDto } from './dto/create-copy-book.dto';
import { UpdateCopyBookDto } from './dto/update-copy-book.dto';
import { CopyBook } from './entities/copy-book.entity';

@Injectable()
export class CopyBookService {

  constructor(
    @InjectRepository(CopyBook) private copyBookRepository: Repository<CopyBook>,
    private bookService: BookService
  ) { }

  async create(createCopyBookDto: CreateCopyBookDto) {
    const { bookId } = createCopyBookDto;
    await this.bookService.findOneById(bookId);
    try {
      return await this.copyBookRepository.save({ book: { id: bookId } });
    } catch (exception) {
      throw new InternalServerErrorException(`Error in create copyBook: ${exception.message}`);
    }

  }

  async findAllByBookId(id: string) {
    await this.bookService.findOneById(id);
    return await this.copyBookRepository.findBy({ book: { id } });
  }

  async findAllByBookCode(code: string) {
    await this.bookService.findOneByCode(code);
    return await this.copyBookRepository.findBy({ book: { code } });
  }

  async findOneById(id: string) {
    const copyBook = await this.copyBookRepository.findOneBy({ id, book: true });
    if (copyBook)
      return copyBook;
    throw new BadRequestException(`Not exist copyBook with id: ${id}`);
  }

  async update(id: string, updateCopyBookDto: UpdateCopyBookDto) {
    await this.findOneById(id);
    try {
      return await this.copyBookRepository.update({ id }, {
        copyBookState: {
          id: updateCopyBookDto.copyBookStateId
        }
      });
    } catch (exception) {
      throw new InternalServerErrorException(`Error in update copyBook: ${exception.message}`);
    }

  }
}
