import { Controller, Get } from '@nestjs/common';
import { PersonStateService } from './person-state.service';

@Controller('person-state')
export class PersonStateController {
  
  constructor(private readonly personStateService: PersonStateService) {}

  @Get()
  findAll() {
    return this.personStateService.findAll();
  }

}
