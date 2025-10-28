import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma.service';
import { PostRepository } from '@modules/post/domain/repository/post.repo.interface';
import { Post } from '@modules/post/domain/entity/post.entity';

@Injectable()
export class PrismaPostRepository implements PostRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(post: Post): Promise<Post> {
        const created = await this.prisma.post.create({
            data: {
                id: post.id,
                title: post.title,
                content: post.content,
            },
        });
        return new Post(created.id, created.title, created.content, created.createdAt, created.updatedAt);
    }

    async findAll(): Promise<Post[]> {
        const posts = await this.prisma.post.findMany();
        return posts.map(p => new Post(p.id, p.title, p.content, p.createdAt, p.updatedAt));
    }

    async findById(id: string): Promise<Post | null> {
        const p = await this.prisma.post.findUnique({ where: { id } });
        return p ? new Post(p.id, p.title, p.content, p.createdAt, p.updatedAt) : null;
    }

    async update(post: Post): Promise<Post> {
        const updated = await this.prisma.post.update({
            where: { id: post.id },
            data: { title: post.title, content: post.content },
        });
        return new Post(updated.id, updated.title, updated.content, updated.createdAt, updated.updatedAt);
    }

    async delete(id: string): Promise<void> {
        await this.prisma.post.delete({ where: { id } });
    }
}
