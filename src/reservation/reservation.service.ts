import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CopyBookService } from 'src/copy-book/copy-book.service';
import { PersonService } from 'src/person/person.service';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationService {

  constructor(
    @InjectRepository(Reservation) private reservationRepository: Repository<Reservation>,
    private copyBookService: CopyBookService,
    private personService: PersonService
  ) { }

  async create(createReservationDto: CreateReservationDto) {
    const { copyBookId, personId } = createReservationDto;
    const {  generatedMaps } = await this.reservationRepository.insert({
      copyBook: { 
        id: copyBookId
      },
      person: {
        id: personId
      }
    });
    const { id } = generatedMaps[0];
    return await this.findOneById(id);
  }

  async findAll(skip: number, take: number) {
    return await this.reservationRepository.find({
      skip,
      take
    });
  }

  async findOneById(id: string) {
    const reservation = await this.reservationRepository.findOneBy({ id });
    if (reservation)
      return reservation;
    throw new BadRequestException(`Not exist reservation with id: ${id}`); 1
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    await this.findOneById(id);
    try {
      const {  claimDate, reservationStateId } = updateReservationDto;
      return await this.reservationRepository.update({ id }, {
        claimDate,
        reservationState: { 
          id: reservationStateId 
        },
        
      });
    } catch (exception) {
      throw new InternalServerErrorException(`Error in update reservation: ${exception.message}`);
    }
  }
}
