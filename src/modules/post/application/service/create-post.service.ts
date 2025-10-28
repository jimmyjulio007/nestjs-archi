import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Post } from '@modules/post/domain/entity/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import type { PostRepository } from '@modules/post/domain/repository/post.repo.interface';

@Injectable()
export class CreatePostService {
    constructor(
        @Inject('PostRepository')
        private readonly postRepository: PostRepository,
    ) { }

    async execute(dto: CreatePostDto): Promise<Post> {
        const post = new Post(
            uuid(),
            dto.title,
            dto.content ?? null,
            new Date(),
            new Date()
        );

        return this.postRepository.create(post);
    }
}
