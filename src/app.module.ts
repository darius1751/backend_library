import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'process';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CredentialModule } from './credential/credential.module';
import { Credential } from './credential/entities/credential.entity';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { TestingModule } from '@nestjs/testing';
import { RoleModule } from './role/role.module';
import { Role } from './role/entities/role.entity';
import { PermissionModule } from './permission/permission.module';
import { Permission } from './permission/entities/permission.entity';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { PermissionController } from './permission/permission.controller';

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
      entities: [Credential, Role, Permission]
    }),
    AuthModule,
    RoleModule,
    PermissionModule
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
