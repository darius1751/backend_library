import { Module } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { CredentialController } from './credential.controller';

@Module({
  controllers: [CredentialController],
  providers: [CredentialService]
})
export class CredentialModule {}
