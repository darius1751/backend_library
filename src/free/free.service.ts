import { Injectable } from '@nestjs/common';
import { BookService } from 'src/book/book.service';
import { loginCredentialDto } from 'src/credential/dto/login-credential.dto';
import { PersonService } from 'src/person/person.service';

@Injectable()
export class FreeService {

  constructor(
    private bookService: BookService,
    private personService: PersonService
  ){}
  
  async findAllBooks(skip: number, take: number){
    return await this.bookService.findAll(skip, take);
  }
  async findFlexBooks(skip: number, take: number, query: string){
    return await this.bookService.findFlex(skip, take, query);
  }
  async findFrontPageBookByCode(code: string){
    return await this.bookService.findFrontPageByCode(code);
  }
  async findOneBookByCode(code: string){
    return await this.bookService.findOneByCode(code);
  }
  async findAllBooksByAuthorId(skip: number, take: number, id: string){
    return await this.bookService.findAllByAuthorId(skip, take, id);
  }
  async findAllBooksByCategoryName(skip: number, take: number,categoryName: string){
    return await this.bookService.findAllByCategoryName(skip, take,categoryName);
  }
  async login(loginCredentialDto: loginCredentialDto){
    return await this.personService.login(loginCredentialDto)
  }
}
