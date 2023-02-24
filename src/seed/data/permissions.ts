import { CreatePermissionDto } from "src/permission/dto/create-permission.dto";

export const permissions: CreatePermissionDto[] = [
    {
        name: 'Crear Libros',
        code:1,
        description: 'Puede agregar libros a la plataforma, con toda la informacion correspondiente'
    },
    {
        name: 'Actualizar Libros',
        code: 2,
        description: 'Puede cambiar informacion de libros ya creados'
    },
    {
        name:'Ver Libros',
        code: 3,
        description: 'Puede ver informacion sobre los libros, como nombre, descripcion, estado actual del libro'
    },
    {
        name: 'Crear Usuarios',
        code:4,
        description: 'Puede crear (administradores, bibliotecarios y usuarios) para que puedan acceder e interactuar'
    },
    {
        name: 'Actualizar Usuarios',
        code:5,
        description: 'Puede cambiar informacion de usuarios ya registrados'
    },
    {
        name: 'Crear ejemplares',
        code:6,
        description: 'Puede crear mas ejemplares de libros'
    },
    {
        name:'Actualizar ejemplares',
        code:7,
        description:'Puede realizar cambios en los ejemplares de libros registrados'
    },
    {
        name: 'Agregar autores',
        code:8,
        description: 'Puede agregar nuevos autores'
    },
    {
        name: 'Agregar categorias',
        code:9,
        description: 'Puede agregar nuevas categorias'
    },
    {
        name: 'Realizar prestamos',
        code:10,
        description: 'Puede registrar nuevos prestamos de libros'
    },
    {
        name: 'Realizar devoluciones',
        code:11,
        description: 'Puede registrar devoluciones de libros'
    },
    {
        name: 'Realizar renovaciones',
        code:12,
        description: 'Puede renovar el prestamo de un libro, extendiendo la fecha de entrega'
    },
    {
        name: 'Realizar reservaciones',
        code:13,
        description: 'Puede reservar un libro, para que no pueda ser prestado y el deba ir por el en una fecha especifica'
    },
    {
        name: 'Ver todos los prestamos (ALL)',
        code:14,
        description: 'Puede ver todos los prestamos realizados por todos los usuarios'
    },
    {
        name: 'Ver todos los prestamos (SPECIFIC)',
        code:15,
        description: 'Puede ver todos los prestamos realizados por un usuario especifico'
    },
    {
        name: 'Ver todas las reservaciones (ALL)',
        code:16,
        description: 'Puede ver todas las reservaciones realizadas por todos los usuarios'
    },
    {
        name: 'Ver todas las reservaciones (SPECIFIC)',
        code:17,
        description: 'Puede ver todas las reservaciones realizadas por un usuario especifico'
    },
    {
        name:'Ver todas las renovaciones (ALL)',
        code:18,
        description: 'Puede ver todas las renovaciones realizadas por todos los usuarios'
    },
    {
        name:'Ver todas las renovaciones (SPECIFIC)',
        code:19,
        description:'Puede ver todas las renovaciones realizadas por un usuario especifico'
    }
]