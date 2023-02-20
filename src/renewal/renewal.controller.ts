import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { RenewalService } from './renewal.service';
import { CreateRenewalDto } from './dto/create-renewal.dto';
import { UpdateRenewalDto } from './dto/update-renewal.dto';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRenewalDto: UpdateRenewalDto) {
    return this.renewalService.update(id, updateRenewalDto);
  }
}
