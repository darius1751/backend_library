import { Module } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credential } from './entities/credential.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PersonModule } from 'src/person/person.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Credential]),
    AuthModule, 
    PersonModule
  ],
  exports:[CredentialService],
  providers: [CredentialService],
})
export class CredentialModule {}
