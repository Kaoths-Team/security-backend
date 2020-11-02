import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { User } from '../decorator/user.decorator';
import { UserEntity } from '../entities/user.entity';
import { CommentEntity } from '../entities/comment.entity';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
import { UpdateCommand } from '@nestjs/cli/commands/update.command';

@ApiBearerAuth()
@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(
    @User() user: UserEntity,
    @Body() dto: CreateCommentDto
  ): Promise<CommentEntity> {
    return this.commentService.create(user.id, dto);
  }

  @Delete(':id')
  async deleteComment(
    @User() user: UserEntity,
    @Param('id', ParseIntPipe) commentId: number
  ): Promise<void> {
    return this.commentService.deleteComment(user, commentId);
  }

  @Put(':id')
  async updateComment(
    @User() user: UserEntity,
    @Param('id', ParseIntPipe) commentId: number,
    @Body() dto: UpdateCommentDto
  ): Promise<CommentEntity> {
    return this.commentService.updateComment(user, commentId, dto);
  }
}
