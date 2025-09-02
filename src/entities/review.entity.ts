// review.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Book } from './book.entity';
import { User } from './user.entity';

@Entity("reviews")
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Book, book => book.reviews)
    book: Book;

    @ManyToOne(() => User, user => user.reviews)
    user: User;

    @Column('text')
    content: string;

    @Column({ type: 'int' })
    rating: number; // da 1 a 5

    @CreateDateColumn()
    createdAt: Date;
}
