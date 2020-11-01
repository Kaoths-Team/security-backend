import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
import { CommentService } from './comment.service';
import { CommentEntity } from '../entities/comment.entity';
import { UserEntity } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, CommentEntity, UserEntity])],
  controllers: [PostController],
  providers: [PostService, CommentService],
})
export class PostModule {}
