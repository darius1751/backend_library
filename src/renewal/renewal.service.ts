import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRenewalDto } from './dto/create-renewal.dto';
import { UpdateRenewalDto } from './dto/update-renewal.dto';
import { Renewal } from './entities/renewal.entity';

@Injectable()
export class RenewalService {

  constructor(
    @InjectRepository(Renewal) private renewalRepository: Repository<Renewal>
  ){}
  
  create(createRenewalDto: CreateRenewalDto) {
    return 'This action adds a new renewal';
  }

  async findAll(skip: number, take: number) {
    return await this.renewalRepository.find({
      skip,
      take,
      order:{
        createdAt:'DESC'
      }
    });
  }

  async findOneById(id: string) {
    const renewal = await this.renewalRepository.findOneBy({id});
    if(renewal)
      return renewal;
    throw new BadRequestException(`Not exist renewal with id: ${id}`);
  }

  update(id: string, updateRenewalDto: UpdateRenewalDto) {
    return `This action updates a #${id} renewal`;
  }

  remove(id: string) {
    return `This action removes a #${id} renewal`;
  }
}
