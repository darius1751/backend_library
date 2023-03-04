import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesEnum } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/rolesGuard/roles.guard';
import { ReservationStateService } from './reservation-state.service';

@Controller('reservation-state')
@UseGuards(RolesGuard)
export class ReservationStateController {
  
  constructor(private readonly reservationStateService: ReservationStateService) {}

  @Get()
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario,
    RolesEnum.Usuario
  )
  findAll() {
    return this.reservationStateService.findAll();
  }
  

}
