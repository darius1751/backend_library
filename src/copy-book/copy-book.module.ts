import { Module } from '@nestjs/common';
import { CopyBookService } from './copy-book.service';
import { CopyBookController } from './copy-book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CopyBook } from './entities/copy-book.entity';
import { BookModule } from 'src/book/book.module';
import { CopyBookStateModule } from 'src/copy-book-state/copy-book-state.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([CopyBook]),
    BookModule,
    CopyBookStateModule
  ],
  controllers: [CopyBookController],
  providers: [CopyBookService],
  exports: [CopyBookService]
})
export class CopyBookModule {}
