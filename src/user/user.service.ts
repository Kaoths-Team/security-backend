import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserRole } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(conditions): Promise<UserEntity> {
    return this.userRepository.findOne(conditions);
  }

  async findByUsernameWithPassword(username: string): Promise<UserEntity> {
    return this.userRepository
      .createQueryBuilder()
      .where('username = :username', { username })
      .addSelect('password', 'UserEntity_password')
      .getOne();
  }

  async findById(id: string): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const newUser = this.userRepository.create({
      ...user,
      role: UserRole.User,
    });
    return this.userRepository.save(newUser);
  }
}
