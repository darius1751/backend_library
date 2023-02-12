import { Controller, Get,  Param } from '@nestjs/common';
import { ReservationStateService } from './reservation-state.service';

@Controller('reservation-state')
export class ReservationStateController {
  
  constructor(private readonly reservationStateService: ReservationStateService) {}

  @Get()
  findAll() {
    return this.reservationStateService.findAll();
  }
  

}
