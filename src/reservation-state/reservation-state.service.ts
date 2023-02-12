import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservationStateDto } from './dto/create-reservation-state.dto';
import { ReservationState } from './entities/reservation-state.entity';

@Injectable()
export class ReservationStateService {
  
  constructor(
    @InjectRepository(ReservationState) private reservationStateRepository:Repository<ReservationState>
  ){}

  async create(createReservationStateDto: CreateReservationStateDto) {
    try{
      return this.reservationStateRepository.create(createReservationStateDto);
    }catch(exception){
      throw new InternalServerErrorException(`Error in create reservationState, exception: ${exception.message}`);
    }
    
  }

  findAll() {
    return this.reservationStateRepository.find();
  }
  
}
