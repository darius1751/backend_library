import { Credential } from "src/credential/entities/credential.entity";
import { PersonState } from "src/person-state/entities/person-state.entity";
import { Role } from "src/role/entities/role.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Person {

    @PrimaryColumn({
        generated: 'uuid'
    })
    public readonly id: string;

    @Column({
        name:'document_identifier',
        unique: true,
        nullable: false
    })
    public readonly documentIdentifier: string;

    @Column()
    public readonly name: string;

    @Column()
    public readonly phone: string;

    @Column({

    })
    public readonly address: string;

    @Column({
        type: 'date'
    })
    public readonly birthday: string;

    @Column()
    public readonly email: string;

    @JoinColumn({ name: 'role_id' })
    @ManyToOne(() => Role, { nullable: false })
    public readonly role: Role;

    @JoinColumn({ name: 'person_state_id' })
    @ManyToOne(() => PersonState, { nullable: false })
    public readonly personState: PersonState;

    @JoinColumn({ name: 'credential_id' })
    @OneToOne(() => Credential, { nullable: false })
    public readonly credential: Credential;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at',
        nullable: false
    })
    public readonly createdAt: string;

}
