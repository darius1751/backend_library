import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'process';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CredentialModule } from './credential/credential.module';
import { Credential } from './credential/entities/credential.entity';

@Module({
  imports: [
    CredentialModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:'mysql',
      database: env.DATABASE_NAME,
      username: env.DATABASE_USERNAME,
      password: env.DATABASE_PASSWORD,
      connectTimeout:8000,
      host: env.DATABASE_HOST,
      port:parseInt(env.DATABASE_PORT),
      autoLoadEntities:true,
      synchronize:true,
      entities:[Credential]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
