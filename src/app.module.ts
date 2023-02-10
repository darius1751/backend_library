import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CredentialModule } from './credential/credential.module';

@Module({
  imports: [CredentialModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
