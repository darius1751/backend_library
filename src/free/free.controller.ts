import { Controller, Get, Post, Body,  Param,  ParseUUIDPipe, Query, ParseIntPipe, Res, UseFilters, Header } from '@nestjs/common';
import { Response } from 'express';
import { extname } from 'path';
import { ExceptionFileFilter } from 'src/common/exception-file/exception-file.filter';
import { getContentTypeImage } from 'src/common/helpers/getContentTypeImage';
import { loginCredentialDto } from 'src/credential/dto/login-credential.dto';
import { FreeService } from './free.service';

@Controller('free')
export class FreeController {

  constructor(private readonly freeService: FreeService) { }

  @Get('/book')
  findAllBooks(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
  ) {
    return this.freeService.findAllBooks(skip, take);
  }

  @Get('/book/frontPage/:code')
  @Header('content-disposition', 'inline')
  @UseFilters(ExceptionFileFilter)
  async findFrontPageByCode(
    @Param('code') code: string,
    @Res({ passthrough: true }) res: Response
  ) {

    const image: any = await this.freeService.findFrontPageBookByCode(code);
    const ext = extname(image.getStream().path)
    res.set('content-type', getContentTypeImage(ext));
    return image;

  }

  @Get('book/query/flex')
  findFlex(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
    @Query('query') query: string
  ) {
    return this.freeService.findFlexBooks(skip, take, query);
  }

  @Get('book/code/:code')
  findOneBookByCode(@Param('code') code: string) {
    return this.freeService.findOneBookByCode(code);
  }

  @Get('book/author/:id')
  findAllBooksByAuthorId(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.freeService.findAllBooksByAuthorId(skip, take, id);
  }

  @Get('book/category/:name')
  findAllBooksByCategoryName(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
    @Param('name') name: string
  ) {
    return this.freeService.findAllBooksByCategoryName(skip, take, name);
  }
  
  @Post('person/login')
  login(@Body() loginCredentialDto: loginCredentialDto) {
    return this.freeService.login(loginCredentialDto);
  }
}