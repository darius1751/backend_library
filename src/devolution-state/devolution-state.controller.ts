import { Controller, Get } from '@nestjs/common';
import { DevolutionStateService } from './devolution-state.service';

@Controller('devolution-state')
export class DevolutionStateController {

  constructor(private readonly devolutionStateService: DevolutionStateService) {}
  
  @Get()
  findAll() {
    return this.devolutionStateService.findAll();
  }

}
