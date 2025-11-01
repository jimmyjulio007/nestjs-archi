import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
    @ApiProperty({
        description: 'The title of the post',
        example: 'How to Build a DDD App in NestJS',
    })
    @IsString()
    @IsNotEmpty()
    title!: string;

    @ApiProperty({
        description: 'Optional content of the post',
        example: 'In this tutorial, we explore how to use Clean Architecture...',
        required: false,
    })
    @IsOptional()
    @IsString()
    content?: string;
}
