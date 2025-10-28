import { Inject, Injectable } from '@nestjs/common';
import type { PostRepository } from '@modules/post/domain/repository/post.repo.interface';
import { Post } from '@modules/post/domain/entity/post.entity';

@Injectable()
export class GetPostsService {
    constructor(
        @Inject('PostRepository')
        private readonly postRepository: PostRepository,
    ) { }

    async execute(): Promise<Post[]> {
        return this.postRepository.findAll();
    }
}
