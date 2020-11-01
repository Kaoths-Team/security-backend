import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { PostEntity } from '../entities/post.entity';
import { UserEntity } from '../entities/user.entity';
import { CreateCommentDto } from './comment.dto';
import { UserRole } from '../user/user.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findById(id: number): Promise<CommentEntity> {
    return this.commentRepository.findOne(id);
  }

  async create(
    userId: number,
    { postId, ...comment }: CreateCommentDto
  ): Promise<CommentEntity> {
    const post: PostEntity = await this.postRepository.findOne(postId);
    const user: UserEntity = await this.userRepository.findOne(userId);
    const newComment: CommentEntity = this.commentRepository.create({
      ...comment,
      post,
      author: user,
    });
    return this.commentRepository.save(newComment);
  }

  async deleteComment(user: UserEntity, commentId: number): Promise<void> {
    const comment: CommentEntity = await this.findById(commentId);
    if (user.role !== UserRole.Admin && comment.author.id !== user.id) {
      throw new BadRequestException('You are not author of this comment');
    }
    await this.commentRepository.delete(commentId);
  }
}
