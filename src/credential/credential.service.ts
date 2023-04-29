import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { Credential } from './entities/credential.entity';
import { compareSync, hashSync } from 'bcrypt';
import { loginCredentialDto } from './dto/login-credential.dto';
import { AuthService } from 'src/auth/auth.service';
import { PersonService } from 'src/person/person.service';

@Injectable()
export class CredentialService {

  constructor(
    @InjectRepository(Credential) private credentialRepository: Repository<Credential>,
    private authService: AuthService, 
    private personService: PersonService
  ) { }

  async findOneById(id: string) {
    
      const credential = await this.credentialRepository.findOneBy({ id });
      if(credential){
        const { id, user } = credential;
        return { id, user };
      }
      throw new BadRequestException(`Not exist credential with id: ${id}`);
    
  }

  async create(createCredentialDto: CreateCredentialDto) {
    try {
      const credential = await this.credentialRepository.save({
        ...createCredentialDto,
        password: hashSync(createCredentialDto.password, 10)
      });
      return credential.id;

    } catch (exception) {
      throw new BadRequestException(`Error in create user: ${exception.message}`);
    }
  }

  async login(loginCredentialDto: loginCredentialDto) {
      const { user, password } = loginCredentialDto;
      const userDB = await this.credentialRepository.findOneBy({ user });
      if (compareSync(password, userDB?.password)) {
        const { id } = userDB;
        const { role } = await this.personService.findOneByCredentialId(id);
        const token = this.authService.generateToken(role.id);
        return { id, token };
      }
      throw new BadRequestException(`Error in login user: ${user}`);
    }
  
  async update(id: string, updateCredentialDto: UpdateCredentialDto) {
    try {
      await this.findOneById(id);
      return await this.credentialRepository.update({ id }, updateCredentialDto);

    } catch (exception) {
      throw new BadRequestException(`Don't exist credential with id: ${id}`);
    }

  }

}
