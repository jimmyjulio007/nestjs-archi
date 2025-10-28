import { Inject, Injectable } from '@nestjs/common';
import type { PostRepository } from '@modules/post/domain/repository/post.repo.interface';

@Injectable()
export class DeletePostService {
    constructor(
        @Inject('PostRepository')
        private readonly postRepository: PostRepository,
    ) { }

    async execute(id: string) {
        return this.postRepository.delete(id);
    }
}
