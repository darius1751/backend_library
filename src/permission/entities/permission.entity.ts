import { Role } from "src/role/entities/role.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Permission {
    
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
