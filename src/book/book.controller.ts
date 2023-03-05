import { Controller, Get, Post, Body, Patch, Param, ParseUUIDPipe, Query, ParseIntPipe, UseInterceptors, UploadedFile, Header, UseFilters, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesEnum } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/rolesGuard/roles.guard';
import { ExceptionFileFilter } from 'src/common/exception-file/exception-file.filter';
import { validateImageFile } from 'src/common/helpers/validateImageFile';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
@UseGuards(RolesGuard)
export class BookController {

  constructor(private readonly bookService: BookService) { }

  @Post()
  @UseInterceptors(FileInterceptor('frontPage', {
    storage: diskStorage({
      destination: 'images/books',
      filename: validateImageFile
    })
  }))
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario
  )
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
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario,
    RolesEnum.Usuario
  )
  findFrontPageByCode(
    @Param('codeWithExtension') codeWithExtension: string
  ) {
    return this.bookService.findFrontPageByCode(codeWithExtension);
  }


  @Get(':id')
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario,
    RolesEnum.Usuario
  )
  findOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookService.findOneById(id);
  }

  @Get('code/:code')
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario,
    RolesEnum.Usuario
  )
  findOneByCode(@Param('code') code: string) {
    return this.bookService.findOneByCode(code);
  }

  @Get()
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario,
    RolesEnum.Usuario
  )
  findAll(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
  ) {
    return this.bookService.findAll(skip, take);
  }

  @Get('category/:name')
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario,
    RolesEnum.Usuario
  )
  findAllByCategoryName(@Param('name') name: string) {
    return this.bookService.findAllByCategoryName(name);
  }

  @Get('author/:id')
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario,
    RolesEnum.Usuario
  )
  findAllByAuthorId(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookService.findAllByAuthorId(id);
  }

  @Patch(':id')
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario
  )
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }
}
