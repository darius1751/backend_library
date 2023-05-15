import { Controller, Get, Post, Body, Patch, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { RolesEnum } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/rolesGuard/roles.guard';

@Controller('author')
@UseGuards(RolesGuard)
export class AuthorController {

  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario
  )
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @Get()
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario,
    RolesEnum.Usuario
  )
  findAll() {
    return this.authorService.findAll();
  }
  
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario,
    RolesEnum.Usuario
  )
  @Get(':id')
  findOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.authorService.findOneById(id);
  }
  
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario
  )
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(id, updateAuthorDto);
  }
  
}
