import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { RoleService } from 'src/role/role.service';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RolesEnum } from '../enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  
  constructor(
    private reflector: Reflector,
    private readonly roleService: RoleService
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.verifyRole(context);
  }
  async verifyRole(context: ExecutionContext):Promise<boolean>{
      const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
      if(roles.includes(RolesEnum.ALL))
        return true;
      const request: Request = context.switchToHttp().getRequest();
      const { role_id } = request.headers;
      if(role_id){
        const role = await this.roleService.findOneById(role_id as string);
        return roles.includes(role.name);
      }
      return false;
  }
}
