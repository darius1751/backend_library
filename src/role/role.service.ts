import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  
  constructor(@InjectRepository(Role) private roleRepository:Repository<Role>){}
  
  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  async findAll() {
    try{
      const roles = await this.roleRepository.find({
        relations:{
          permissions:true
        }
      });

      return roles;
      
    }catch(exception){
      throw new InternalServerErrorException(`${exception}`);
    }
    
  }

  async findOne(id: string) {
    
    const role = await this.roleRepository.findOneBy({id, permissions:true});
    if(role)
      return role;
    throw new BadRequestException(`Don't exist role with id: ${id}`);
  }

}
