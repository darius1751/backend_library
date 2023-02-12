import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { LoanStateService } from './loan-state.service';
import { CreateLoanStateDto } from './dto/create-loan-state.dto';

@Controller('loan-state')
export class LoanStateController {
  
  constructor(private readonly loanStateService: LoanStateService) {}
  
  @Get()
  findAll() {
    return this.loanStateService.findAll();
  }

  
}
