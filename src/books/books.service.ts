import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book) private booksRepo: Repository<Book>,
    ) {}

    findAll(): Promise<Book[]> {
        return this.booksRepo.find();
    }

    findOne(id: number): Promise<Book | null> {
        return this.booksRepo.findOneBy({ id });
    }

    create(bookData: Partial<Book>): Promise<Book> {
        const book = this.booksRepo.create(bookData);
        return this.booksRepo.save(book);
    }

    async update(id: number, data: Partial<Book>): Promise<Book | null> {
        await this.booksRepo.update(id, data);
        return this.booksRepo.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.booksRepo.delete(id);
    }
    async findByUserPaginated(
        userId: number,
        page: number = 1,
        limit: number = 10,
    ) {
        const [books, total] = await this.booksRepo.findAndCount({
            where: { user: { id: userId } },
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' }, // opzionale: ordina per data
        });

        return {
            data: books,
            total,                 // totale libri utente
            page,                  // pagina corrente
            lastPage: Math.ceil(total / limit), // numero totale di pagine
        };
    }
}
