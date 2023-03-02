import { Controller, Get, Post, Body, Patch, Param, ParseUUIDPipe } from '@nestjs/common';
import { CopyBookService } from './copy-book.service';
import { CreateCopyBookDto } from './dto/create-copy-book.dto';
import { UpdateCopyBookDto } from './dto/update-copy-book.dto';

@Controller('copy-book')
export class CopyBookController {

  constructor(private readonly copyBookService: CopyBookService) {}

  @Post()
  create(@Body() createCopyBookDto: CreateCopyBookDto) {
    return this.copyBookService.create(createCopyBookDto);
  }

  @Get('book/:id')
  findAllByBookId(@Param('id', ParseUUIDPipe) id: string) {
    return this.copyBookService.findAllByBookId(id);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.copyBookService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCopyBookDto: UpdateCopyBookDto) {
    return this.copyBookService.update(id, updateCopyBookDto);
  }
}
