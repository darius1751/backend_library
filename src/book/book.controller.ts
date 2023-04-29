import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  ParseUUIDPipe, 
  Query, 
  ParseIntPipe, 
  UseInterceptors, 
  UploadedFile, 
  Header, 
  UseFilters, 
  UseGuards, 
  Req,
  Res
} from '@nestjs/common';
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
import { Request, Response } from 'express';
import { extname } from 'path';
import { getContentTypeImage } from 'src/common/helpers/getContentTypeImage';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { AddCategoryDTO } from './dto/add-category-dto';

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
    @Body() createBookDto: CreateBookDto,
    @Req() req: Request
  ) {
    const { originalname } = frontPage;
    createBookDto.frontPage = originalname;
    createBookDto.secureURL = `${req.protocol}://${req.get('host')}${req.originalUrl}/frontPage/${createBookDto.code}`
    return this.bookService.create(createBookDto);
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

  @Patch(':id')
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario
  )
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Patch(':id/categories')
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario
  )
  addCategories(@Param('id', ParseUUIDPipe) id: string,@Body() addCategoryDto: AddCategoryDTO){
    this.bookService.addCategories(id, addCategoryDto);
  }
}
