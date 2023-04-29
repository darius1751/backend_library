import { Module } from '@nestjs/common';
import { FreeService } from './free.service';
import { FreeController } from './free.controller';
import { BookModule } from 'src/book/book.module';
import { PersonModule } from 'src/person/person.module';

@Module({
  imports:[BookModule, PersonModule],
  controllers: [FreeController],
  providers: [FreeService]
})
export class FreeModule {}
