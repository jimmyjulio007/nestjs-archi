import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePostDto } from '@modules/post/application/dto/update-post.dto';
import type { PostRepository } from '@modules/post/domain/repository/post.repo.interface';


@Injectable()
export class UpdatePostService {
    constructor(
        @Inject('PostRepository')
        private readonly postRepository: PostRepository,
    ) { }

    async execute(id: string, dto: UpdatePostDto) {
        const post = await this.postRepository.findById(id);
        if (!post) throw new NotFoundException('Post not found');

        post.update(dto.title ?? post.title, dto.content ?? post.content);
        return this.postRepository.update(post);
    }
}
