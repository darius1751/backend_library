import { CreateReservationStateDto } from "src/reservation-state/dto/create-reservation-state.dto";

export const reservationStates: CreateReservationStateDto[] = [
    {
        name:'Activo'
    },
    {
        name:'Reclamado'
    },
    {
        name:'Sin reclamar - Expirado'
    }
];