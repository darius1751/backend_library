import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionService } from 'src/permission/permission.service';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  
  constructor(
    @InjectRepository(Role) private roleRepository:Repository<Role>,
    private permissionService: PermissionService
  ){}
  
  async create(createRoleDto: CreateRoleDto) {
    try{
      const { name, description, permissionCodes } = createRoleDto;
      const permissions = await this.permissionService.findIdsByCodes(permissionCodes);
      return await this.roleRepository.save({
        name, 
        description,
        permissions
      },{
        reload: true
      });

    }catch(exception){
      const { code } = exception;
      console.log({exception});
      if(code === 'ER_DUP_ENTRY')
        throw new BadRequestException(`Exist role with name: ${createRoleDto.name}`);
    }
    
  }

  async findAll() {
    const roles = await this.roleRepository.find({
      relations:{
        permissions:true
      },
      order:{
        permissions:{
          code:'ASC'
        }
      }
    });
   return roles;
  }

  async findOneById(id: string) {
    
    const role = await this.roleRepository.findOneBy(
      {
        id,
        permissions:true
      }
    );
    if(role)
      return role;
    throw new BadRequestException(`Don't exist role with id: ${id}`);
  }

}
