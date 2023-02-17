import { Controller, Get, Post, Body, Patch, Param, ParseUUIDPipe, Query, ParseIntPipe } from '@nestjs/common';
import { DevolutionService } from './devolution.service';
import { CreateDevolutionDto } from './dto/create-devolution.dto';
import { UpdateDevolutionDto } from './dto/update-devolution.dto';

@Controller('devolution')
export class DevolutionController {

  constructor(private readonly devolutionService: DevolutionService) {}

  @Post()
  create(@Body() createDevolutionDto: CreateDevolutionDto) {
    return this.devolutionService.create(createDevolutionDto);
  }

  @Get()
  findAll(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number
  ) {
    return this.devolutionService.findAll(skip, take);
  }

  @Get('person/:id')
  findAllByPersonId(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
    @Param('id', ParseUUIDPipe) id: string
  ){
    return this.devolutionService.findAllByPersonId(id, skip, take);
  }

  @Get(':id')
  findOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.devolutionService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDevolutionDto: UpdateDevolutionDto) {
    return this.devolutionService.update(id, updateDevolutionDto);
  }
}
