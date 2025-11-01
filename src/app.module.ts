import { Module } from '@nestjs/common';
import { PostModule } from '@modules/post/post.module';
import { APP_FILTER } from '@nestjs/core';
import { PrismaClientExceptionFilter } from '@common/filters/prisma-exception.filter';

@Module({
  imports: [PostModule],
  providers: [
    { provide: APP_FILTER, useClass: PrismaClientExceptionFilter },
  ],
})
export class AppModule {}
