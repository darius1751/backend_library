import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { TestingModule } from '@nestjs/testing';
import { env } from 'process';

import { AppService } from './app.service';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { AppController } from './app.controller';
import { PermissionController } from './permission/permission.controller';


import { CredentialModule } from './credential/credential.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { PersonStateModule } from './person-state/person-state.module';
import { LoanStateModule } from './loan-state/loan-state.module';
import { AuthorModule } from './author/author.module';
import { CategoryModule } from './category/category.module';
import { ReservationStateModule } from './reservation-state/reservation-state.module';
import { DevolutionStateModule } from './devolution-state/devolution-state.module';
import { CopyBookStateModule } from './copy-book-state/copy-book-state.module';
import { PersonModule } from './person/person.module';

import { Credential } from './credential/entities/credential.entity';
import { Role } from './role/entities/role.entity';
import { PersonState } from './person-state/entities/person-state.entity';
import { Author } from './author/entities/author.entity';
import { Category } from './category/entities/category.entity';
import { ReservationState } from './reservation-state/entities/reservation-state.entity';
import { DevolutionState } from './devolution-state/entities/devolution-state.entity';
import { Permission } from './permission/entities/permission.entity';
import { Person } from './person/entities/person.entity';

@Module({
  imports: [
    CredentialModule,
    TestingModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: env.SECRET,
      signOptions: { expiresIn: '10h' }
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: env.DATABASE_NAME,
      username: env.DATABASE_USERNAME,
      password: env.DATABASE_PASSWORD,
      connectTimeout: 8000,
      host: env.DATABASE_HOST,
      port: parseInt(env.DATABASE_PORT),
      autoLoadEntities: true,
      synchronize: true,
      entities: [
        Credential,
        Role,
        Permission,
        PersonState,
        Author,
        Category,
        ReservationState,
        DevolutionState,
        Person
      ]
    }),
    AuthModule,
    RoleModule,
    PermissionModule,
    PersonStateModule,
    LoanStateModule,
    AuthorModule,
    CategoryModule,
    ReservationStateModule,
    DevolutionStateModule,
    CopyBookStateModule,
    PersonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{ 
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(JwtMiddleware)
    .forRoutes(AppController,PermissionController)
  }
}
