import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesEnum } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/rolesGuard/roles.guard';
import { DevolutionStateService } from './devolution-state.service';

@Controller('devolution-state')
@UseGuards(RolesGuard)
export class DevolutionStateController {

  constructor(private readonly devolutionStateService: DevolutionStateService) {}
  
  @Get()
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario,
    RolesEnum.Usuario
  )
  findAll() {
    return this.devolutionStateService.findAll();
  }

}
