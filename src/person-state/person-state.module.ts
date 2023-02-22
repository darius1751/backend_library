import { Module } from '@nestjs/common';
import { PersonStateService } from './person-state.service';
import { PersonStateController } from './person-state.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonState } from './entities/person-state.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([PersonState])
  ],
  controllers: [PersonStateController],
  providers: [PersonStateService],
  exports:[PersonStateService]
})
export class PersonStateModule {}
