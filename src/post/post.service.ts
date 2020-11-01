import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async create(userId: number, post: PostEntity): Promise<PostEntity> {
    const user: UserEntity = await this.userRepository.findOne(userId);
    const newPost: PostEntity = this.postRepository.create({
      ...post,
      author: user,
    });
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
