import { Controller, Get,  Param,  ParseUUIDPipe } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {

  constructor(private readonly roleService: RoleService) {}
 
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.roleService.findOne(id);
  }

  
}
