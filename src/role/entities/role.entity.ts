import { Permission } from "src/permission/entities/permission.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany,  OneToMany,  PrimaryColumn } from "typeorm";

@Entity()
export class Role {
    
    @PrimaryColumn({
        generated:'uuid'
    })
    public readonly id:string;

    @Column({
        unique:true,
        nullable: false
    })
    public readonly name:string;
    
    @Column({
        nullable:true,
        default:null
    })
    public readonly description:string;    
    
    @JoinTable({
        name:'permission_x_role'
    })
    @ManyToMany(() => Permission, {
        nullable: false
    })
    public readonly permissions:Permission[];
}