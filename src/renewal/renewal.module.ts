import { Module } from '@nestjs/common';
import { RenewalService } from './renewal.service';
import { RenewalController } from './renewal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Renewal } from './entities/renewal.entity';
import { LoanModule } from 'src/loan/loan.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Renewal]),
    LoanModule
  ],
  controllers: [RenewalController],
  providers: [RenewalService]
})
export class RenewalModule {}
