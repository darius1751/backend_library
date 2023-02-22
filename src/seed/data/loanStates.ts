import { CreateLoanStateDto } from "src/loan-state/dto/create-loan-state.dto";

export const loanStates: CreateLoanStateDto[] = [
    {
        name:'Activo'
    },
    {
        name:'Vencido - sin entregar'
    },
    {
        name:'Vencido - entregado'
    },
    {
        name:'Completado',
        description:'Se termino el prestamo, ya se entrego el libro de forma satisfactoria.'
    }
]