import { Module } from '@nestjs/common';
import { PersonStateService } from './person-state.service';
import { PersonStateController } from './person-state.controller';

@Module({
  controllers: [PersonStateController],
  providers: [PersonStateService]
})
export class PersonStateModule {}
