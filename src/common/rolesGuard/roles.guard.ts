import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { RoleService } from 'src/role/role.service';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private reflector: Reflector,
    private readonly roleService: RoleService,
    private readonly jwtService: JwtService
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.verifyRole(context);
  }

  async verifyRole(context: ExecutionContext): Promise<boolean> {
    try {
      const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
      const request: Request = context.switchToHttp().getRequest();
      const { token } = request.headers;
      const { id } = this.jwtService.decode(token as string, { json: true }) as any;
      if (id) {
        const { name } = await this.roleService.findOneById(id);
        return roles.includes(name);
      }
      return false;
    } catch (exception) {
      return false;
    }

  }
}
