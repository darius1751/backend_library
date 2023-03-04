import { Controller, Get, Post, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { RenewalService } from './renewal.service';
import { CreateRenewalDto } from './dto/create-renewal.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesEnum } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/rolesGuard/roles.guard';

@Controller('renewal')
@UseGuards(RolesGuard)
export class RenewalController {
  
  constructor(private readonly renewalService: RenewalService) {}

  @Post()
  @Roles(
    RolesEnum.Usuario
  )
  create(@Body() createRenewalDto: CreateRenewalDto) {
    return this.renewalService.create(createRenewalDto);
  }

  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario
  )
  findAll(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number
  ) {
    return this.renewalService.findAll(skip, take);
  }

  @Get(':id')
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario
  )
  findOneById(@Param('id') id: string) {
    return this.renewalService.findOneById(id);
  }
}
