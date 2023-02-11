import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Credential {
    @PrimaryColumn({
        generated:'uuid'        
    })
    public readonly id:string;
    
    @Column({
        nullable: false,
        unique:true
    })
    public readonly user:string;

    @Column({
        nullable:false
    })
    public readonly password:string;
}
