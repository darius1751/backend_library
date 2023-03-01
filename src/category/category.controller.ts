import { Controller, Get, Post, Body, Patch, Param, ParseUUIDPipe, UploadedFile, UseInterceptors, UseFilters, Header, Query, ParseIntPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ExceptionFileFilter } from 'src/exception-file/exception-file.filter';
import { validateImageFile } from 'src/helpers/validateImageFile';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination:'images/categories',
      filename: validateImageFile
    })
  }))
  create(
    @UploadedFile() image: Express.Multer.File,
    @Body() createCategoryDto: CreateCategoryDto
  ) {
    createCategoryDto.image = image.originalname;
    return this.categoryService.create(createCategoryDto);
  }
  
  @Get('image/:image')
  @Header('content-type','octet-stream')
  @Header('content-disposition', 'inline')
  @UseFilters(ExceptionFileFilter)
  findImage(@Param('image') image: string){
    return this.categoryService.findImage(image);
  }

  @Get()
  findAll(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number
  ) {
    return this.categoryService.findAll(skip,take);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }
}
