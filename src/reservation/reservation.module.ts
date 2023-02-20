import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { PersonModule } from 'src/person/person.module';
import { CopyBookModule } from 'src/copy-book/copy-book.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Reservation]),
    PersonModule,
    CopyBookModule
  ],
  controllers: [ReservationController],
  providers: [ReservationService]
})
export class ReservationModule {}
