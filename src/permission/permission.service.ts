import { BadRequestException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {

  constructor(@InjectRepository(Permission) private permissionRepository:Repository<Permission>){}


  async create(createPermissionDto:CreatePermissionDto){
    try{
      return await this.permissionRepository.save(createPermissionDto);
    }catch(exception){
      throw new BadRequestException(`permission ${createPermissionDto.name} exist`);
    }
  }
  
  findAll() {
    return this.permissionRepository.find();
  }

  async findOneById(id: string) {
    
    const permission = this.permissionRepository.findOneBy({id});
      if(permission)
        return permission;
    throw new BadRequestException(`Find One permission, don't exist permission with id ${id}`);   
  }
  
  async findOneByCode(code: number){
    const permission = await this.permissionRepository.findOneBy({code});
    if(permission)
      return permission;
    console.log(`Error en code ${code}`);
    throw new BadRequestException(`Not exist one permission with code: ${code}`);
  }

  async findIdsByCodes(codes: number[]){
    const ids:{id: string}[] = [];
    for(const code of codes){
      const permission = await this.findOneByCode(code);
      ids.push({id: permission.id});
    }
    return ids;
  }
}