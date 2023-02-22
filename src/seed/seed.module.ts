import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthorModule } from 'src/author/author.module';
import { CategoryModule } from 'src/category/category.module';
import { CopyBookStateModule } from 'src/copy-book-state/copy-book-state.module';
import { DevolutionStateModule } from 'src/devolution-state/devolution-state.module';
import { LoanStateModule } from 'src/loan-state/loan-state.module';
import { PermissionModule } from 'src/permission/permission.module';
import { PersonStateModule } from 'src/person-state/person-state.module';
import { ReservationStateModule } from 'src/reservation-state/reservation-state.module';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports:[
    AuthorModule,
    CategoryModule,
    CopyBookStateModule,
    DevolutionStateModule,
    LoanStateModule,
    PermissionModule,
    PersonStateModule,
    ReservationStateModule,
    RoleModule
  ],
  controllers: [SeedController],
  providers: [SeedService]
})
export class SeedModule {}
