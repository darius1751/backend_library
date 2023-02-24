import { Injectable } from '@nestjs/common';

import { AuthorService } from 'src/author/author.service';
import { CategoryService } from 'src/category/category.service';
import { CopyBookStateService } from 'src/copy-book-state/copy-book-state.service';
import { DevolutionStateService } from 'src/devolution-state/devolution-state.service';
import { LoanStateService } from 'src/loan-state/loan-state.service';
import { PermissionService } from 'src/permission/permission.service';
import { PersonStateService } from 'src/person-state/person-state.service';
import { ReservationStateService } from 'src/reservation-state/reservation-state.service';
import { RoleService } from 'src/role/role.service';

import {
  authors,
  categories,
  copyBookStates,
  devolutionStates,
  loanStates,
  permissions,
  personStates,
  reservationStates,
  roles,
} from './data';


@Injectable()
export class SeedService {

  constructor(
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private copyBookStateService: CopyBookStateService,
    private devolutionStateService: DevolutionStateService,
    private loanStateService: LoanStateService,
    private permissionService: PermissionService,
    private personStateService: PersonStateService,
    private reservationStateService: ReservationStateService,
    private roleService: RoleService,
  ) { }

  async implementSeed() {
    personStates.forEach(
      async (personState) => await this.personStateService.create(personState)
    );
    categories.forEach(
      async (category) => await this.categoryService.create(category)
    );
    loanStates.forEach(
      async (loanState) => await this.loanStateService.create(loanState)
    );
    copyBookStates.forEach(
      async (copyBookState) => await this.copyBookStateService.create(copyBookState)
    );
    permissions.forEach(
      async (permission) => await this.permissionService.create(permission)
    );
    devolutionStates.forEach(
      async (devolutionState) => await this.devolutionStateService.create(devolutionState)
    );
    reservationStates.forEach(
      async (reservationState) => await this.reservationStateService.create(reservationState)
    );
    authors.forEach(
      async (author) => await this.authorService.create(author)
    );
    return { message: 'Ok implement seed :D' }
  }
 
  async implementedRoles(){
    roles.forEach(
      async (role) => await this.roleService.create(role)
    );
    return { message:'Ok implement seed role.' };
  }
  
}
