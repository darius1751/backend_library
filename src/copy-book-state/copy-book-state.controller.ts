import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesEnum } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/rolesGuard/roles.guard';
import { CopyBookStateService } from './copy-book-state.service';

@Controller('copy-book-state')
@UseGuards(RolesGuard)
export class CopyBookStateController {

  constructor(private readonly copyBookStateService: CopyBookStateService) {}
  
  @Get()
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario,
    RolesEnum.Usuario
  )
  findAll() {
    return this.copyBookStateService.findAll();
  }  

}

