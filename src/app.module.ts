import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { PostModule } from '@modules/post/post.module';
import { APP_FILTER } from '@nestjs/core';
import { PrismaClientExceptionFilter } from '@common/filters/prisma-exception.filter';

@Module({
  imports: [PostModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: PrismaClientExceptionFilter },
  ],
})
export class AppModule {}
