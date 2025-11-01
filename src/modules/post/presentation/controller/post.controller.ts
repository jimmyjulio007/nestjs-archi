import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    NotFoundException,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiParam,
} from '@nestjs/swagger';
import { CreatePostService } from '@modules/post/application/service/create-post.service';
import { UpdatePostService } from '@modules/post/application/service/update-post.service';
import { DeletePostService } from '@modules/post/application/service/delete-post.service';
import { GetPostsService } from '@modules/post/application/service/get-post.service';
import { GetAPostService } from '@modules/post/application/service/get-postid.service';
import { CreatePostDto } from '@modules/post/application/dto/create-post.dto';
import { UpdatePostDto } from '@modules/post/application/dto/update-post.dto';
import { PostResponseDto } from '../../application/dto/response-post.dto';

@ApiTags('Posts')
@ApiBearerAuth()
@Controller('posts')
export class PostController {
    constructor(
        private readonly createPostService: CreatePostService,
        private readonly getPostsService: GetPostsService,
        private readonly updatePostService: UpdatePostService,
        private readonly deletePostService: DeletePostService,
        private readonly getAPostService: GetAPostService,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Retrieve all posts' })
    @ApiResponse({
        status: 200,
        description: 'List of all posts',
        type: PostResponseDto,
    })
    async findAll() {
        return this.getPostsService.execute();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a single post by ID' })
    @ApiParam({ name: 'id', required: true, description: 'UUID of the post' })
    @ApiResponse({
        status: 200,
        description: 'Post found',
        type: PostResponseDto,
    })
    @ApiResponse({
        status: 404,
        description: 'Post not found',
    })
    async findById(@Param('id') id: string) {
        const post = await this.getAPostService.execute(id);
        if (!post) {
            throw new NotFoundException(`Post with ID "${id}" not found.`);
        }
        return post;
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new post' })
    @ApiResponse({
        status: 201,
        description: 'Post successfully created',
        type: CreatePostDto,
    })
    async create(@Body() dto: CreatePostDto) {
        return this.createPostService.execute(dto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update an existing post' })
    @ApiParam({ name: 'id', required: true, description: 'UUID of the post' })
    @ApiResponse({
        status: 200,
        description: 'Post successfully updated',
        type: UpdatePostDto,
    })
    @ApiResponse({ status: 404, description: 'Post not found' })
    async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
        const updated = await this.updatePostService.execute(id, dto);
        if (!updated) {
            throw new NotFoundException(`Post with ID "${id}" not found.`);
        }
        return updated;
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a post by ID' })
    @ApiParam({ name: 'id', required: true, description: 'UUID of the post' })
    @ApiResponse({
        status: 204,
        description: 'Post successfully deleted',
    })
    @ApiResponse({ status: 404, description: 'Post not found' })
    async delete(@Param('id') id: string) {
        const deleted = await this.deletePostService.execute(id);
        return deleted;
    }
}
