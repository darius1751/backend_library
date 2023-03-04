import { Controller, Get,  Param,  ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesEnum } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/rolesGuard/roles.guard';
import { PermissionService } from './permission.service';

@Controller('permission')
@UseGuards(RolesGuard)
export class PermissionController {

  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario,
  )
  findAll() {
    return this.permissionService.findAll();
  }

  @Get(':id')
  @Roles(
    RolesEnum.Administrador,
    RolesEnum.Bibliotecario,
  )
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.permissionService.findOneById(id);
  }
}
