import { Controller, Get, Post, Body, Patch, Param, ParseUUIDPipe, UploadedFile, UseInterceptors, UseFilters, Header, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesEnum } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/rolesGuard/roles.guard';
import { ExceptionFileFilter } from 'src/exception-file/exception-file.filter';
import { validateImageFile } from 'src/helpers/validateImageFile';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
@UseGuards(RolesGuard)
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination:'images/categories',
      filename: validateImageFile
    })
  }))
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario
  )
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
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario,
    RolesEnum.Usuario
  )
  findImage(@Param('image') image: string){
    return this.categoryService.findImage(image);
  }

  @Get()
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario,
    RolesEnum.Usuario
  )
  findAll(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number
  ) {
    return this.categoryService.findAll(skip,take);
  }

  @Get(':id')
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario,
    RolesEnum.Usuario
  )
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryService.findOneById(id);
  }

  @Patch(':id')
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario
  )
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }
}
