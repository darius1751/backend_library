import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { PersonModule } from 'src/person/person.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Loan]),
    PersonModule
  ],
  controllers: [LoanController],
  providers: [LoanService],
  exports:[ LoanService ]
})
export class LoanModule {}
