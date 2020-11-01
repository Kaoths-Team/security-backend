import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostEntity } from '../entities/post.entity';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CommentEntity } from '../entities/comment.entity';
import { CommentService } from './comment.service';
import { User } from '../decorator/user.decorator';
import { UserEntity } from '../entities/user.entity';

@ApiBearerAuth()
@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService
  ) {}

  @Post()
  async createPost(
    @User() user: UserEntity,
    @Body() post: PostEntity
  ): Promise<PostEntity> {
    return this.postService.create(user.id, post);
  }

  @Get()
  @ApiQuery({
    name: 'comments',
    enum: ['true'],
    allowEmptyValue: true,
    required: false,
  })
  async getAllPosts(
    @Query('comments') comments: string
  ): Promise<PostEntity[]> {
    if (comments) {
      const includeComments = comments === 'true';
      return this.postService.findAll(includeComments);
    }
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiQuery({
    name: 'comments',
    enum: ['true'],
    allowEmptyValue: true,
    required: false,
  })
  async getPost(
    @Param('id') postId: string,
    @Query('comments') comments: string
  ): Promise<PostEntity> {
    if (comments) {
      const includeComments = comments === 'true';
      return this.postService.findById(postId, includeComments);
    }
    return this.postService.findById(postId);
  }

  @Post(':id/comment')
  async createComment(
    @User() user: UserEntity,
    @Param('id', ParseIntPipe) postId: number,
    @Body() comment: CommentEntity
  ): Promise<CommentEntity> {
    return this.commentService.create(user.id, postId, comment);
  }
}
