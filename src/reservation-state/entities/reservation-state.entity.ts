import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class ReservationState {
    
    @PrimaryColumn({
        generated:'uuid'
    })
    public readonly id:string;

    @Column({
        unique:true,
        nullable:false
    })
    public readonly name:string;

    @Column({
        nullable:true, 
        default:null
    })
    public readonly description:string;

}
