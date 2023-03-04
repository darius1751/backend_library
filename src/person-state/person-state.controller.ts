import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesEnum } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/rolesGuard/roles.guard';
import { PersonStateService } from './person-state.service';

@Controller('person-state')
@UseGuards(RolesGuard)
export class PersonStateController {
  
  constructor(private readonly personStateService: PersonStateService) {}

  @Get()
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario,
    RolesEnum.Usuario
  )
  findAll() {
    return this.personStateService.findAll();
  }

}
