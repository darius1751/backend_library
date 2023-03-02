import { Controller, Get } from '@nestjs/common';
import { CopyBookStateService } from './copy-book-state.service';

@Controller('copy-book-state')
export class CopyBookStateController {

  constructor(private readonly copyBookStateService: CopyBookStateService) {}

  
  @Get()
  findAll() {
    return this.copyBookStateService.findAll();
  }  

}

