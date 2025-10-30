import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { PostRepository } from '@modules/post/domain/repository/post.repo.interface';

@Injectable()
export class GetAPostService {
    constructor(
        @Inject('PostRepository')
        private readonly postRepository: PostRepository,
    ) { }

    async execute(id: string) {
        const post = await this.postRepository.findById(id);

        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }

        return post;
    }
}
