import { Book } from "src/book/entities/book.entity";
import { CopyBookState } from "src/copy-book-state/entities/copy-book-state.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
@Index(['number', 'book'], { unique: true })
export class CopyBook {

    @PrimaryColumn({
        generated: 'uuid'
    })
    public readonly id: string;

    @Column()
    public readonly number: number;

    @JoinColumn({
        name: 'book_id'
    })
    @ManyToOne(() => Book, { nullable: false })
    public readonly book: Book;

    @JoinColumn({
        name: 'copy_book_state_id'
    })
    @ManyToOne(() => CopyBookState, { nullable: false })
    public readonly copyBookState: CopyBookState;
}
