import { Body, Controller, Post } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { loginCredentialDto } from './dto/login-credential.dto';

@Controller('credential')
export class CredentialController {

  constructor(private readonly credentialService: CredentialService) { }

  @Post()
  login(@Body() loginCredentialDto: loginCredentialDto) {
    return this.credentialService.login(loginCredentialDto);
  }

}
