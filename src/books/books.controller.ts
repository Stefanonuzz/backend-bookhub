import {Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Query, Request} from '@nestjs/common';
import { BooksService } from './books.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Book } from '../entities/book.entity';

@Controller('books')
@UseGuards(JwtAuthGuard)
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Get()
    findAll(): Promise<Book[]> {
        return this.booksService.findAll();
    }
    @UseGuards(JwtAuthGuard)
    @Get('paginated')
    async getPaginatedBooks(
        @Request() req,
        @Query('page') page: string,
        @Query('limit') limit: string,
    ) {
        const userId = req.user.userId;
        return this.booksService.findByUserPaginated(
            userId,
            Number(page) || 1,
            Number(limit) || 10,
        );
    }
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Book | null> {
        return this.booksService.findOne(+id);
    }

    @Post()
    create(@Body() bookData: Partial<Book>): Promise<Book> {
        return this.booksService.create(bookData);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: Partial<Book>): Promise<Book | null> {
        return this.booksService.update(+id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.booksService.remove(+id);
    }

}
