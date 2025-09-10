// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Book } from './entities/book.entity';
import { Review } from './entities/review.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import {BooksModule} from "./books/books.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'bookhub',
      entities: [User, Book, Review],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    BooksModule,
  ],
})
export class AppModule {}
