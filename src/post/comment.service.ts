import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { PostEntity } from '../entities/post.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>
  ) {}

  async create(postId: string, comment: CommentEntity): Promise<CommentEntity> {
    const post: PostEntity = await this.postRepository.findOne(postId);
    const newComment: CommentEntity = this.commentRepository.create({
      ...comment,
      post,
    });
    return this.commentRepository.save(newComment);
  }
}
