import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
    @ApiPropertyOptional({
        description: 'Updated title of the post',
        example: 'Updated: Clean Architecture in NestJS',
    })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({
        description: 'Updated content of the post',
        example: 'Here we update only the title, but content can also change.',
    })
    @IsOptional()
    @IsString()
    content?: string;
}
