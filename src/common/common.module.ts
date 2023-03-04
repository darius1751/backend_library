import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RoleModule } from 'src/role/role.module';
import { RoleService } from 'src/role/role.service';
import { RolesGuard } from './rolesGuard/roles.guard';

@Global()
@Module({
    imports:[RoleModule],
    providers:[
        {
            provide: APP_GUARD,
            useClass: RolesGuard
        }
    ]
})
export class CommonModule {}
