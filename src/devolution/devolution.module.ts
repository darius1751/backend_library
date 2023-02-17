import { Module } from '@nestjs/common';
import { DevolutionService } from './devolution.service';
import { DevolutionController } from './devolution.controller';
import { Devolution } from './entities/devolution.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanModule } from 'src/loan/loan.module';
import { DevolutionStateModule } from 'src/devolution-state/devolution-state.module';
import { PersonModule } from 'src/person/person.module';
import { CopyBookModule } from 'src/copy-book/copy-book.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Devolution]),
    LoanModule,
    DevolutionStateModule,
    PersonModule,
    CopyBookModule
  ],
  controllers: [DevolutionController],
  providers: [DevolutionService]
})
export class DevolutionModule {}
