import { SetMetadata } from "@nestjs/common";
import { RolesEnum} from "../enums/roles.enum";
export const ROLES_KEY = 'role';
export const Roles = (...roles: RolesEnum[]) => SetMetadata(ROLES_KEY, roles);