import { CopyBook } from "src/copy-book/entities/copy-book.entity";
import { Person } from "src/person/entities/person.entity";
import { ReservationState } from "src/reservation-state/entities/reservation-state.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Reservation {
    
    @PrimaryColumn({
        generated:'uuid'
    })
    public readonly id: string;
    
    @JoinColumn({
        name:'copy_book_id'
    })
    @ManyToOne(( ) => CopyBook)
    public readonly copyBook: CopyBook;

    @JoinColumn({
        name:'person_id'
    })
    @ManyToOne(( ) => Person)
    public readonly person: Person;

    @Column({
        type:'timestamp',
        name:'claim_date',
        nullable: false
    })
    public readonly claimDate: string;

    @JoinColumn({
        name:'reservation_state_id'
    })
    @ManyToOne(() => ReservationState)
    public readonly reservationState: ReservationState;
}
