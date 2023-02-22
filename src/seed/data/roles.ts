import { CreateRoleDto } from "src/role/dto/create-role.dto";

export const roles: CreateRoleDto[] = [
    {
        name: 'Administrador',
        permissionCodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 14, 17, 19]
    },
    {
        name: 'Bibliotecario',
        permissionCodes: [1, 2, 3, 6, 7, 8, 9, 10, 11, 14,16, 18]

    },
    {
        name: 'Usuario',
        permissionCodes: [3, 12, 13, 15,17,19]
    }
]