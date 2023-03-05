import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CopyBookService } from 'src/copy-book/copy-book.service';
import { generatePagination } from 'src/common/helpers/generatePagination';
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
    private personService: PersonService,
    private configService: ConfigService
  ) { }

  async create(createReservationDto: CreateReservationDto) {
    const { copyBookId, personId } = createReservationDto;
    await this.copyBookService.isAvailable(copyBookId);
    await this.personService.isActive(personId);
    await this.copyBookService.updateToReservation(copyBookId);
    const claimDate = new Date();
    const limitReservation = +this.configService.get<number>('LIMIT_RESERVATION_IN_DAYS');
    claimDate.setDate(claimDate.getDate() + limitReservation);
    return await this.reservationRepository.save({
      copyBook: {
        id: copyBookId
      },
      person: {
        id: personId
      },
      claimDate:claimDate.toJSON()
      
    });
  }

  async findAll(skip: number, take: number) {
    const [reservations, totalRegisters] = await this.reservationRepository.findAndCount({
      skip,
      take
    });
    return {
      reservations,
      pagination: generatePagination(skip, take, totalRegisters)
    }
  }

  async findOneById(id: string) {
    const reservation = await this.reservationRepository.findOneBy({ id });
    if (reservation)
      return reservation;
    throw new BadRequestException(`Not exist reservation with id: ${id}`);
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    await this.findOneById(id);
    try {
      const { claimDate, reservationStateId } = updateReservationDto;
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
