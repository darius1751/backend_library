import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class DevolutionState {
    
    @PrimaryColumn({
        generated:'uuid'
    })
    public readonly id:string;

    @Column({
        nullable:false
    })
    public readonly name:string;

    @Column({
        nullable:true,
        default:null
    })
    public readonly description:string;
}
