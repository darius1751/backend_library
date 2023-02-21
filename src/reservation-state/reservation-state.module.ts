import { Module } from '@nestjs/common';
import { ReservationStateService } from './reservation-state.service';
import { ReservationStateController } from './reservation-state.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationState } from './entities/reservation-state.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ReservationState])
  ],
  controllers: [ReservationStateController],
  providers: [ReservationStateService],
  exports:[ReservationStateService]
})
export class ReservationStateModule {}
