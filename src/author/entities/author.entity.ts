import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Author {
    
    @PrimaryColumn({
        generated:'uuid'
    })
    public readonly id:string;

    @Column({
        unique:true
    })
    public readonly name:string;
}
