import { BadRequestException, Injectable, InternalServerErrorException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {

  constructor(@InjectRepository(Category) private categoryRepository:Repository<Category>){}

  async create(createCategoryDto: CreateCategoryDto) {
    try{
      return await this.categoryRepository.save(createCategoryDto);
    }catch(exception){
      throw new InternalServerErrorException(`Error in create category ${exception.message}`);
    }
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findImage(image: string){
    const path = join(__dirname, '..','..','images','categories',image);
    if(existsSync(path)){
      const imageFile = createReadStream(path);
      return new StreamableFile(imageFile);
    }
    throw new BadRequestException(`categories`);
  }

  async findOneById(id: string) {
    const category = await this.categoryRepository.findOneBy({id});
    if(category)
      return category;
    throw new BadRequestException(`Not exist category with id: ${id}`);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.findOneById(id);
    try{
      return await this.categoryRepository.update({id},updateCategoryDto);
    }catch(exception){
      throw new InternalServerErrorException(`Error in update category, exception: ${exception.message}`);
    }
    
  }

}
