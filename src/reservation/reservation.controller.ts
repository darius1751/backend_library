import { Controller, Get, Post, Body, Patch, Param, ParseUUIDPipe, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesEnum } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/rolesGuard/roles.guard';

@Controller('reservation')
@UseGuards(RolesGuard)
export class ReservationController {

  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @Roles(
    RolesEnum.Usuario
  )
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.create(createReservationDto);
  }

  @Get()
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario
  )
  findAll(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take',ParseIntPipe) take: number
  ) {
    return this.reservationService.findAll(skip, take);
  }

  @Get(':id')
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario
  )
  findOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.reservationService.findOneById(id);
  }

  @Patch(':id')
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario
  )
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationService.update(id, updateReservationDto);
  }

}
