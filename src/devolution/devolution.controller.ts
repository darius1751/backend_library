import { Controller, Get, Post, Body, Patch, Param, ParseUUIDPipe, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesEnum } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/rolesGuard/roles.guard';
import { DevolutionService } from './devolution.service';
import { CreateDevolutionDto } from './dto/create-devolution.dto';
import { UpdateDevolutionDto } from './dto/update-devolution.dto';

@Controller('devolution')
@UseGuards(RolesGuard)
export class DevolutionController {

  constructor(private readonly devolutionService: DevolutionService) {}

  @Post()
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario
  )
  create(@Body() createDevolutionDto: CreateDevolutionDto) {
    return this.devolutionService.create(createDevolutionDto);
  }

  @Get()
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario,
  )
  findAll(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number
  ) {
    return this.devolutionService.findAll(skip, take);
  }

  @Get('person/:id')
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario,
    RolesEnum.Usuario
  )
  findAllByPersonId(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
    @Param('id', ParseUUIDPipe) id: string
  ){
    return this.devolutionService.findAllByPersonId(id, skip, take);
  }

  @Get(':id')
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario
  )
  findOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.devolutionService.findOneById(id);
  }

  @Patch(':id')
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario
  )
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDevolutionDto: UpdateDevolutionDto) {
    return this.devolutionService.update(id, updateDevolutionDto);
  }
}
