// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Book } from './book.entity';
import { Review } from './review.entity';

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Book, book => book.user)
    books: Book[];

    @OneToMany(() => Review, review => review.user)
    reviews: Review[];
}
