import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Author {
    
    @PrimaryColumn({
        generated:'uuid'
    })
    public readonly id:string;

    @Column()
    public readonly name:string;
}
