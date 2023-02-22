import { Module } from '@nestjs/common';
import { LoanStateService } from './loan-state.service';
import { LoanStateController } from './loan-state.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanState } from './entities/loan-state.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([LoanState])
  ],
  controllers: [LoanStateController],
  providers: [LoanStateService],
  exports:[LoanStateService]
})
export class LoanStateModule {}
