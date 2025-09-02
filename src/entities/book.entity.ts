// book.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Review } from './review.entity';

@Entity("books")
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    genre: string;

    @Column({ nullable: true })
    publishedYear: number;

    @ManyToOne(() => User, user => user.books)
    user: User;

    @OneToMany(() => Review, review => review.book)
    reviews: Review[];

    @CreateDateColumn()
    createdAt: Date;
}
