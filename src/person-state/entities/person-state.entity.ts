import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class PersonState {
    
    @PrimaryColumn({
        generated:'uuid'
    })
    public readonly id:string;

    @Column({
        nullable:false,
        unique:true
    })
    public readonly name:string;
    
    @Column({
        nullable:true
    })
    public readonly description:string;
}
