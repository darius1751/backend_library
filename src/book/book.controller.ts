import { Controller, Get, Post, Body, Patch, Param, ParseUUIDPipe, Query, ParseIntPipe } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {

  constructor(private readonly bookService: BookService) { }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get(':id')
  findOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookService.findOneById(id);
  }

  @Get('')
  findOneByCode(@Param('code') code: string){
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
  findAllByCategoryName(@Param('name') name:string){
    return this.bookService.findAllByCategoryName(name);
  }
  
  @Get('author/:id')
  findAllByAuthorId(@Param('id', ParseUUIDPipe) id: string){
    return this.bookService.findAllByAuthorId(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }
}
