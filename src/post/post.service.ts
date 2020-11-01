import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserRole } from '../user/user.dto';

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

  async findById(postId: number, includeComments?: boolean): Promise<PostEntity> {
    if (includeComments && includeComments === true) {
      return this.postRepository.findOne(postId, { relations: ['comments'] });
    }
    return this.postRepository.findOne(postId);
  }

  async deletePost(user: UserEntity, postId: number): Promise<void> {
    const post: PostEntity = await this.findById(postId);
    if (user.role !== UserRole.Admin && post.author.id !== user.id) {
      throw new BadRequestException('You are not author of this post');
    }
    await this.postRepository.delete(postId);
  }
}
