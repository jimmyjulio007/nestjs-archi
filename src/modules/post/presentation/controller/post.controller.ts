import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { CreatePostService } from '@modules/post/application/service/create-post.service';
import { UpdatePostService } from '@modules/post/application/service/update-post.service';
import { DeletePostService } from '@modules/post/application/service/delete-post.service';
import { CreatePostDto } from '@modules/post/application/dto/create-post.dto';
import { UpdatePostDto } from '@modules/post/application/dto/update-post.dto';
import { GetPostsService } from '@modules/post/application/service/get-post.service';
import { GetAPostService } from '../../application/service/get-postid.service';

@Controller('posts')
export class PostController {
    constructor(
        private readonly createPost: CreatePostService,
        private readonly getPosts: GetPostsService,
        private readonly updatePost: UpdatePostService,
        private readonly deletePost: DeletePostService,
        private readonly getAPost: GetAPostService
    ) { }

    @Get()
    findAll() {
        return this.getPosts.execute();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        const post = this.getAPost.execute(id);
        if (!post) {
            throw new NotFoundException(`Post with ${id} does not exist.`);
        }
        return post;
    }

    @Post()
    create(@Body() dto: CreatePostDto) {
        return this.createPost.execute(dto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
        return this.updatePost.execute(id, dto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.deletePost.execute(id);
    }
}
