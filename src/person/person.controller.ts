import { Controller, Get, Post, Body, Patch, Param, Query, ParseIntPipe } from '@nestjs/common';
import { PersonService } from './person.service';

import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { loginCredentialDto } from 'src/credential/dto/login-credential.dto';

@Controller('person')
export class PersonController {

  constructor(private readonly personService: PersonService) { }

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Post('login')
  login(loginCredentialDto: loginCredentialDto) {
    return this.personService.login(loginCredentialDto);
  }

  @Get()
  findAll(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number
  ) {
    return this.personService.findAll(skip, take);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.personService.findOneById(id);
  }

  @Get('identifier/:documentIdentifier')
  findOneByDocumentIdentifier(@Param('documentIdentifier') documentIdentifier: string) {
    return this.personService.findOneByDocumentIdentifier(documentIdentifier);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(id, updatePersonDto);
  }

}
