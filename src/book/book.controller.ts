import { Controller, Get, Post, Body, Patch, Param, ParseUUIDPipe, Query, ParseIntPipe, UseInterceptors, UploadedFile, Header, UseFilters, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ExceptionFileFilter } from 'src/exception-file/exception-file.filter';
import { validateImageFile } from 'src/helpers/validateImageFile';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {

  constructor(private readonly bookService: BookService) { }

  @Post()
  @UseInterceptors(FileInterceptor('frontPage', {
    storage: diskStorage({
      destination: 'images/books',
      filename: validateImageFile
    })
  }))
  create(
    @UploadedFile() frontPage: Express.Multer.File,
    @Body() createBookDto: CreateBookDto
  ) {
    const { originalname } = frontPage;
    createBookDto.frontPage = originalname;
    return this.bookService.create(createBookDto);
  }

  @Get('frontPage/:codeWithExtension')
  @Header('content-disposition', 'inline')
  @Header('content-type', 'octet-stream')
  @UseFilters(ExceptionFileFilter)
  findFrontPageByCode(
    @Param('codeWithExtension') codeWithExtension: string
  ) {
    return this.bookService.findFrontPageByCode(codeWithExtension);
  }


  @Get(':id')
  findOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookService.findOneById(id);
  }

  @Get('code/:code')
  findOneByCode(@Param('code') code: string) {
    return this.bookService.findOneByCode(code);
  }

  @Get()
  findAll(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
  ) {
    return this.bookService.findAll(skip, take);
  }

  @Get('category/:name')
  findAllByCategoryName(@Param('name') name: string) {
    return this.bookService.findAllByCategoryName(name);
  }

  @Get('author/:id')
  findAllByAuthorId(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookService.findAllByAuthorId(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }
}
