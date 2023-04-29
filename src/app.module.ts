import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { TestingModule } from '@nestjs/testing';
import { env } from 'process';

import { AppService } from './app.service';
import { JwtMiddleware } from './common/jwt/jwt.middleware';
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
import { BookModule } from './book/book.module';
import { CopyBookModule } from './copy-book/copy-book.module';

import { Credential } from './credential/entities/credential.entity';
import { Role } from './role/entities/role.entity';
import { PersonState } from './person-state/entities/person-state.entity';
import { Author } from './author/entities/author.entity';
import { Category } from './category/entities/category.entity';
import { ReservationState } from './reservation-state/entities/reservation-state.entity';
import { DevolutionState } from './devolution-state/entities/devolution-state.entity';
import { Permission } from './permission/entities/permission.entity';
import { Person } from './person/entities/person.entity';
import { Book } from './book/entities/book.entity';
import { CopyBook } from './copy-book/entities/copy-book.entity';
import { LoanModule } from './loan/loan.module';
import { Loan } from './loan/entities/loan.entity';
import { DevolutionModule } from './devolution/devolution.module';
import { Devolution } from './devolution/entities/devolution.entity';
import { ReservationModule } from './reservation/reservation.module';
import { Reservation } from './reservation/entities/reservation.entity';
import { RenewalModule } from './renewal/renewal.module';
import { Renewal } from './renewal/entities/renewal.entity';
import { SeedModule } from './seed/seed.module';
import { SeedController } from './seed/seed.controller';
import { CommonModule } from './common/common.module';
import { FreeModule } from './free/free.module';
import { AuthorController } from './author/author.controller';
import { BookController } from './book/book.controller';
import { CategoryController } from './category/category.controller';
import { CopyBookController } from './copy-book/copy-book.controller';
import { CopyBookStateController } from './copy-book-state/copy-book-state.controller';
import { DevolutionController } from './devolution/devolution.controller';
import { DevolutionStateController } from './devolution-state/devolution-state.controller';
import { LoanController } from './loan/loan.controller';
import { PersonController } from './person/person.controller';
import { PersonStateController } from './person-state/person-state.controller';
import { RenewalController } from './renewal/renewal.controller';
import { ReservationController } from './reservation/reservation.controller';
import { ReservationStateController } from './reservation-state/reservation-state.controller';
import { RoleController } from './role/role.controller';

@Module({
  imports: [
    CredentialModule,
    TestingModule,
    ConfigModule.forRoot({ isGlobal: true }),
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
        Person,
        Book,
        CopyBook,
        Loan,
        Devolution,
        Reservation,
        Renewal
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
    BookModule,
    CopyBookModule,
    LoanModule,
    DevolutionModule,
    ReservationModule,
    RenewalModule,
    SeedModule,
    CommonModule,
    FreeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(
        AppController, 
        AuthorController, 
        BookController, 
        CategoryController, 
        CopyBookController, 
        PermissionController, 
        CopyBookStateController,
        DevolutionController,
        DevolutionStateController,
        LoanController,
        PermissionController,
        PersonController,
        PersonStateController,
        RenewalController,
        ReservationController,
        ReservationStateController,
        RoleController,
        SeedController
        )
  }
}
