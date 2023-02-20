import { Loan } from "src/loan/entities/loan.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Renewal {

    @PrimaryColumn({
        generated:'uuid'
    })
    public readonly id: string;

    @JoinColumn({name: 'loan_id'})
    @ManyToOne(( ) => Loan)
    public readonly loan: Loan

    @Column({
        type:'timestamp',
        name: 'new_return_date',
        nullable: false
    })
    public readonly newReturnDate: string;

    @CreateDateColumn({
        type: 'timestamp',
        name:'created_at',
        nullable: false,
        update: false
        
    })
    public readonly createdAt: string;
}
