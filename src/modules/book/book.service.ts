import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { BookDTO } from './book.dto';

@Injectable()
export class BookService {

    constructor(private prisma: PrismaService) {}

    async create(data: BookDTO) {
        const bookExists = await this.prisma.book.findFirst({
            where: {
                bar_code: data.bar_code,
            }
        });

        if (bookExists) {
            throw new ConflictException('Book already exist');
        }

        const book = await this.prisma.book.create({
            data,
        });

        return book;
    }

    async findAll() {
        return this.prisma.book.findMany();
    }

    async update(id: string, data: BookDTO) {
        const bookExists = await this.prisma.book.findUnique({
            where: {
                id,
            }
        });
        if (!bookExists) {
            throw new NotFoundException('Book does not exist');
        };

        return await this.prisma.book.update({
            data,
            where: {
                id,
            },
        });
    }

    async delete(id: string) {
        const bookExists = await this.prisma.book.findUnique({
            where: {
                id,
            }
        });
        if (!bookExists) {
            throw new NotFoundException('Book does not exist');
        };

        return await this.prisma.book.delete({
            where: {
                id,
            },
        });
    }
}
