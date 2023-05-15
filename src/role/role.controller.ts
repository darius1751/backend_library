import { Controller, Get,  Param,  ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesEnum } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/rolesGuard/roles.guard';
import { RoleService } from './role.service';

@Controller('role')
@UseGuards(RolesGuard)
export class RoleController {

  constructor(private readonly roleService: RoleService) {}
 
  @Get()
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario,
    RolesEnum.Usuario
  )
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario,
    RolesEnum.Usuario
  )
  findOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.roleService.findOneById(id);
  }

  
}
