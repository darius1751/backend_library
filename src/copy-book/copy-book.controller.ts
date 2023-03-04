import { Controller, Get, Post, Body, Patch, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesEnum } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/rolesGuard/roles.guard';
import { CopyBookService } from './copy-book.service';
import { CreateCopyBookDto } from './dto/create-copy-book.dto';
import { UpdateCopyBookDto } from './dto/update-copy-book.dto';

@Controller('copy-book')
@UseGuards(RolesGuard)
export class CopyBookController {

  constructor(private readonly copyBookService: CopyBookService) {}

  @Post()
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario
  )
  create(@Body() createCopyBookDto: CreateCopyBookDto) {
    return this.copyBookService.create(createCopyBookDto);
  }

  @Get('book/:id')
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario,
    RolesEnum.Usuario
  )
  findAllByBookId(@Param('id', ParseUUIDPipe) id: string) {
    return this.copyBookService.findAllByBookId(id);
  }

  @Get(':id')
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario,
    RolesEnum.Usuario
  )
  findOneById(@Param('id') id: string) {
    return this.copyBookService.findOneById(id);
  }

  @Patch(':id')
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario
  )
  update(@Param('id') id: string, @Body() updateCopyBookDto: UpdateCopyBookDto) {
    return this.copyBookService.update(id, updateCopyBookDto);
  }
}
