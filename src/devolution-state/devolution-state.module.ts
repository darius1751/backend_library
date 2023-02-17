import { Module } from '@nestjs/common';
import { DevolutionStateService } from './devolution-state.service';
import { DevolutionStateController } from './devolution-state.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevolutionState } from './entities/devolution-state.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DevolutionState])
  ],
  controllers: [DevolutionStateController],
  providers: [DevolutionStateService],
  exports: [DevolutionStateService]
})
export class DevolutionStateModule { }
