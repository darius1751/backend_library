import { Controller, Get } from '@nestjs/common';
import { LoanStateService } from './loan-state.service';

@Controller('loan-state')
export class LoanStateController {
  
  constructor(private readonly loanStateService: LoanStateService) {}
  
  @Get()
  findAll() {
    return this.loanStateService.findAll();
  }

  
}
