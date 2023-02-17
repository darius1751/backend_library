import { DevolutionState } from "src/devolution-state/entities/devolution-state.entity";
import { Loan } from "src/loan/entities/loan.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Devolution {
    
    @PrimaryColumn({
        generated:'uuid'
    })
    public readonly id: string;

    @JoinColumn({
        name:'loan_id'
    })
    @OneToOne(() => Loan, {
        nullable: false
    })
    public readonly loan: Loan;
    
    @JoinColumn({
        name:'devolution_state_id'
    })
    @ManyToOne(() => DevolutionState, {
        nullable: false
    })
    public readonly devolutionState: DevolutionState;

    @Column({
        nullable: true,
        default: null
    })
    public readonly annotations: string;

    @CreateDateColumn({
        name:'created_at',
        type:'timestamp',
        nullable: false
    })
    public readonly createdAt: string;
}
