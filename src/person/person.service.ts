import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialService } from 'src/credential/credential.service';
import { loginCredentialDto } from 'src/credential/dto/login-credential.dto';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonService {

  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>,
    private credentialService: CredentialService
  ) { }

  async create(createPersonDto: CreatePersonDto) {

    const { credential } = createPersonDto;
    const credentialId = this.credentialService.create(credential);

    try {

      const { generatedMaps } = await  this.personRepository.insert({
        ...createPersonDto,
        credential: { id: credentialId }
      });
      const { id } = generatedMaps[0];
      return await this.findOneById(id);

    } catch (exception) {
      throw new InternalServerErrorException(`Error in create person, Exception : ${exception.message}`);
    }
  }

  async login(loginCredentialDto: loginCredentialDto) {

    const { id, token } = await this.credentialService.login(loginCredentialDto);
    const person = await this.findOneByCredentialId(id);
    return { token, person }
  }


  public async findOneByDocumentIdentifier(documentIdentifier: string) {

    const person = this.personRepository.findOneBy({ documentIdentifier })
    if (person)
      return person;
    throw new BadRequestException(`Not exist person with documentIdentifier: ${documentIdentifier}`);
  }

  findAll(skip: number, take: number) {
    return this.personRepository.find({
      skip, take, order: {
        name: 'ASC'
      }
    });
  }


  public async findOneById(id: string) {
    const person = this.personRepository.findOneBy({ id })
    if (person)
      return person;
    throw new BadRequestException(`Not exist person with id: ${id}`);
  }


  async update(id: string, updatePersonDto: UpdatePersonDto) {
    await this.findOneById(id);
    try {
      return this.personRepository.update({ id }, updatePersonDto);
    } catch (exception) {
      throw new InternalServerErrorException(`Error in update person with id: ${id}`);
    }
  }
  private async findOneByCredentialId(id: string) {

    const person = await this.personRepository.findOneBy({ credential: { id } })
    if (person)
      return person;
    throw new BadRequestException(`Error not exist credentialId`);
  }
}
