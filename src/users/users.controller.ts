// src/users/users.controller.ts
import { Controller, Get, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getProfile(@Request() req): Promise<Partial<User> | null> {
        // req.user può venire con proprietà diverse (userId o id)
        const id = req.user?.userId ?? req.user?.id ?? null;
        if (!id) return null;

        const user = await this.usersService.findOne(+id);
        if (!user) return null;

        const { password, ...safe } = user as any;
        return safe;
    }


    @Get('search')
    async searchUser(@Query('name') name: string): Promise<User[]> {
        if (!name) return new Promise(function(resolve, reject) {
            resolve([]);
        });
        return this.usersService.searchByName(name);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id: number): Promise<void> {
        return this.usersService.remove(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getOne(@Param('id') id: number): Promise<User | null> {
        return this.usersService.findOne(id);
    }


    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(): Promise<User[]> {
        return this.usersService.findAll();
    }
}
