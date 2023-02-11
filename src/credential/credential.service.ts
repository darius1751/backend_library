import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { Credential } from './entities/credential.entity';
import { compareSync, hashSync } from 'bcrypt';
import { loginCredentialDto } from './dto/login-credential.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class CredentialService {

  constructor(
    @InjectRepository(Credential)
    private credentialRepository: Repository<Credential>,
    private authService: AuthService
  ) { }

  async findOneById(id: string) {
    try {
      return await this.credentialRepository.findOneBy({ id });
    } catch (exception) {
      throw new BadRequestException(`FindOneById don't exist id in DB`);
    }
  }

  async create(createCredentialDto: CreateCredentialDto): Promise<string> {
    try {
      const credential = await this.credentialRepository.create({
        ...createCredentialDto,
        password: hashSync(createCredentialDto.password, 10)
      });
      return await credential.id;

    } catch (exception) {
      throw new BadRequestException(`Error in create user: ${exception.message}`);
    }
  }

  async login(loginCredentialDto: loginCredentialDto) {
    try {
      const { user, password } = loginCredentialDto;
      const userDB = await this.credentialRepository.findOneBy({ user });
      if (compareSync(password, userDB?.password)) {
        const { id } = userDB;
        const token = this.authService.generateToken(id);
        return { id, token };
      }

    } catch (exception) {
      throw new BadRequestException(`Error in login user: ${exception.message}`);
    }
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
