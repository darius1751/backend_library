import { Controller, Get, Post, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { RenewalService } from './renewal.service';
import { CreateRenewalDto } from './dto/create-renewal.dto';

@Controller('renewal')
export class RenewalController {
  constructor(private readonly renewalService: RenewalService) {}

  @Post()
  create(@Body() createRenewalDto: CreateRenewalDto) {
    return this.renewalService.create(createRenewalDto);
  }

  @Get()
  findAll(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number
  ) {
    return this.renewalService.findAll(skip, take);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.renewalService.findOneById(id);
  }
}
