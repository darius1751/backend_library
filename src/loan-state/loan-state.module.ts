import { Module } from '@nestjs/common';
import { LoanStateService } from './loan-state.service';
import { LoanStateController } from './loan-state.controller';

@Module({
  controllers: [LoanStateController],
  providers: [LoanStateService]
})
export class LoanStateModule {}
