import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { RoleModule } from 'src/role/role.module';
import { RoleService } from 'src/role/role.service';
import { ExceptionFileFilter } from './exception-file/exception-file.filter';
import { RolesGuard } from './rolesGuard/roles.guard';

@Global()
@Module({
    imports:[RoleModule],
    providers:[
        {
            provide: APP_GUARD,
            useClass: RolesGuard
        },
        {
            provide: APP_FILTER,
            useClass: ExceptionFileFilter,
        }
        
    ]
})
export class CommonModule {}
