import { Author } from "src/author/entities/author.entity";
import { Category } from "src/category/entities/category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Book {
    
    @PrimaryColumn({
        generated:'uuid'
    })
    public readonly id:string;

    @Column({
        unique:true,
        nullable:false
    })
    public readonly code:string;

    @Column({
        nullable:false,
        name:'front_page'
    })
    public readonly frontPage:string;

    @Column({
        nullable:false
    })
    public readonly title:string;

    @Column({
        nullable:true,
        default: null
    })
    public readonly description: string;

    @JoinColumn({
        name:'author_id'
    })
    @ManyToOne(() => Author, {
        nullable: false,
        cascade:true
    })
    public readonly author:Author;
    
    @JoinTable({
        name:'categories_x_book'
    })
    @ManyToMany(() => Category)
    public readonly categories:Category[];

    @Column({
        type:'date',
        name:'publication_date'
    })
    public readonly publicationDate:string;

    @CreateDateColumn({
        type:'timestamp',
        name:'created_at',
        nullable: false
    })
    public readonly createdAt: string;

}
