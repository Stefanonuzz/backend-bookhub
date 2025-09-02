// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }

    // 👇 nuovo metodo per cercare un utente per email
    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } });
    }

    // 👇 aggiorniamo la create per hashare la password
    async create(user: Partial<User>): Promise<User> {
        // controllo che ci sia la password
        if (!user.password) {
            throw new Error('Password is required');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        const newUser = this.usersRepository.create({
            ...user,
            password: hashedPassword,
        });

        return this.usersRepository.save(newUser);
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
