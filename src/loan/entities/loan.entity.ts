import { CopyBook } from "src/copy-book/entities/copy-book.entity";
import { LoanState } from "src/loan-state/entities/loan-state.entity";
import { Person } from "src/person/entities/person.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Loan {

    @PrimaryColumn({
        generated:'uuid'
    })
    public readonly id: string;

    @JoinColumn({
        name: 'copy_book_id'
    })
    @ManyToOne(() => CopyBook, {
        nullable: false
    })
    public readonly copyBook: CopyBook;

    @Column({
        name:'return_date',
        type:'timestamp',
        nullable: false
    })
    public readonly returnDate: string;

    @Column({
        name:'updated_at',
        nullable: true,
        default: null,
        type:'timestamp'
    })
    public readonly updatedAt: string;

    @CreateDateColumn({
        name:'created_at',
        type:'timestamp',
        nullable: false
    })
    public readonly createdAt: string;
    
    @JoinColumn({
        name:'person_id'
    })
    @ManyToOne(() => Person, {
        nullable: false
    })
    public readonly person: Person;

    @JoinColumn({
        name:'loan_state_id'
    })
    @ManyToOne(() => LoanState, {
        nullable: false
    })
    public readonly loanState: LoanState;
}
