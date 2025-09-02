// src/users/users.controller.ts
import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<User> {
        // @ts-ignore
        return this.usersService.findOne(+id);
    }

    @Post()
    create(@Body() userData: Partial<User>): Promise<User> {
        return this.usersService.create(userData);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(+id);
    }
}
