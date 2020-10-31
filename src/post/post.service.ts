import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>
  ) {}

  async create(post: PostEntity): Promise<PostEntity> {
    const newPost: PostEntity = this.postRepository.create(post);
    return this.postRepository.save(newPost);
  }

  async findAll(includeComments?: boolean): Promise<PostEntity[]> {
    if (includeComments && includeComments === true) {
      return this.postRepository.find({ relations: ['comments'] });
    }
    return this.postRepository.find();
  }

  async findById(
    postId: string,
    includeComments?: boolean
  ): Promise<PostEntity> {
    if (includeComments && includeComments === true) {
      return this.postRepository.findOne(postId, { relations: ['comments'] });
    }
    return this.postRepository.findOne(postId);
  }
}
