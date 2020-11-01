import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { CommentEntity } from './comment.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  content: string;

  @OneToMany(
    () => CommentEntity,
    comment => comment.post
  )
  comments: CommentEntity[];

  @ManyToOne(
    () => UserEntity,
    user => user.posts,
    { eager: true, onDelete: 'SET NULL' }
  )
  author: UserEntity;
}
