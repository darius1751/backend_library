import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  
  constructor(@InjectRepository(Role) private roleRepository:Repository<Role>){}
  
  async create(createRoleDto: CreateRoleDto) {
    try{
      const { generatedMaps } = await this.roleRepository.insert(createRoleDto);
      const { id } = generatedMaps[0];
      return await this.findOneById(id);
    }catch(exception){
      const { code } = exception;
      if(code === 'ER_DUP_ENTRY')
        throw new BadRequestException(`Exist role with name: ${createRoleDto.name}`);
    }
    
  }

  async findAll() {
    const roles = await this.roleRepository.find({
      relations:{
        permissions:true
      }
    });
   return roles;
  }

  async findOneById(id: string) {
    
    const role = await this.roleRepository.findOneBy({id, permissions:true});
    if(role)
      return role;
    throw new BadRequestException(`Don't exist role with id: ${id}`);
  }

}
