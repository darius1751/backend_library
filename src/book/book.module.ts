import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { AuthorModule } from 'src/author/author.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Book]),
    AuthorModule,
    CategoryModule
  ],
  controllers: [BookController],
  providers: [BookService],
  exports:[BookService]
})
export class BookModule {}
