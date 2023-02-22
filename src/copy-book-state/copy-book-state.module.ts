import { Module } from '@nestjs/common';
import { CopyBookStateService } from './copy-book-state.service';
import { CopyBookStateController } from './copy-book-state.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CopyBookState } from './entities/copy-book-state.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([CopyBookState])
  ],
  controllers: [CopyBookStateController],
  providers: [CopyBookStateService],
  exports:[CopyBookStateService]
})
export class CopyBookStateModule {}
