import { Module } from '@nestjs/common';
import { RenewalService } from './renewal.service';
import { RenewalController } from './renewal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Renewal } from './entities/renewal.entity';
import { LoanModule } from 'src/loan/loan.module';
import { PersonModule } from 'src/person/person.module';
import { CopyBookModule } from 'src/copy-book/copy-book.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Renewal]),
    LoanModule,
    PersonModule,
    CopyBookModule
  ],
  controllers: [RenewalController],
  providers: [RenewalService]
})
export class RenewalModule {}
