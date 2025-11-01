import { ApiProperty } from '@nestjs/swagger';

export class PostResponseDto {
    @ApiProperty({ example: 'a1b2c3d4e5', description: 'Unique post ID' })
    id!: string;

    @ApiProperty({ example: 'NestJS Clean Architecture' })
    title!: string;

    @ApiProperty({ example: 'Step-by-step guide...' })
    content!: string | null;

    @ApiProperty({ example: '2025-10-31T08:30:00Z' })
    createdAt!: Date;

    @ApiProperty({ example: '2025-10-31T09:00:00Z' })
    updatedAt!: Date;
}
