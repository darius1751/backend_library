import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CopyBookStateService } from './copy-book-state.service';
import { CreateCopyBookStateDto } from './dto/create-copy-book-state.dto';

@Controller('copy-book-state')
export class CopyBookStateController {

  constructor(private readonly copyBookStateService: CopyBookStateService) {}

  
  @Get()
  findAll() {
    return this.copyBookStateService.findAll();
  }  

}

