import { Module } from '@nestjs/common';
import { CopyBookService } from './copy-book.service';
import { CopyBookController } from './copy-book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CopyBook } from './entities/copy-book.entity';
import { BookModule } from 'src/book/book.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([CopyBook]),
    BookModule
  ],
  controllers: [CopyBookController],
  providers: [CopyBookService]
})
export class CopyBookModule {}
