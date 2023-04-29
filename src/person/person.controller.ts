import { Controller, Get, Post, Body, Patch, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { RolesGuard } from 'src/common/rolesGuard/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesEnum } from 'src/common/enums/roles.enum';

@Controller('person')
@UseGuards(RolesGuard)
export class PersonController {

  constructor(private readonly personService: PersonService) { }

  @Post()
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario
  )
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario
  )
  findAll(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number
  ) {
    return this.personService.findAll(skip, take);
  }

  @Get(':id')
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario
  )
  findOneById(@Param('id') id: string) {
    return this.personService.findOneById(id);
  }

  @Get('identifier/:documentIdentifier')
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario
  )
  findOneByDocumentIdentifier(@Param('documentIdentifier') documentIdentifier: string) {
    return this.personService.findOneByDocumentIdentifier(documentIdentifier);
  }

  @Patch(':id')
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario
  )
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(id, updatePersonDto);
  }

}
