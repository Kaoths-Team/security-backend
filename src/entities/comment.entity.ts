import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { PostEntity } from './post.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  content: string;

  @ManyToOne(
    () => PostEntity,
    post => post.comments,
    { onDelete: 'CASCADE' }
  )
  post: PostEntity;

  @ManyToOne(
    () => UserEntity,
    user => user.comments,
    { eager: true, onDelete: 'SET NULL' }
  )
  author: UserEntity;
}
