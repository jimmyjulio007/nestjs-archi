import { Module } from '@nestjs/common';
import { PostController } from '@modules/post/presentation/controller/post.controller';
import { CreatePostService } from '@modules/post/application/service/create-post.service';
import { UpdatePostService } from '@modules/post/application/service/update-post.service';
import { DeletePostService } from '@modules/post/application/service/delete-post.service';
import { PrismaPostRepository } from '@modules/post/infrastructure/prisma/post.repo.prisma';
import { GetPostsService } from '@modules/post/application/service/get-post.service';
import { PrismaModule } from '@app/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [PostController],
    providers: [
        // Dépôt (infrastructure)
        {
            provide: 'PostRepository',
            useClass: PrismaPostRepository,
        },
        // Services (application)
        CreatePostService,
        GetPostsService,
        UpdatePostService,
        DeletePostService,
    ],
})
export class PostModule { }
