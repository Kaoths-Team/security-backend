import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PostEntity } from './post.entity';
import { CommentEntity } from './comment.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty()
  @Column({ select: false })
  password: string;

  @OneToMany(
    () => PostEntity,
    post => post.author,
    { onDelete: 'CASCADE' }
  )
  posts: PostEntity[];

  @OneToMany(
    () => CommentEntity,
    comment => comment.author,
    { onDelete: 'CASCADE' }
  )
  comments: CommentEntity[];
}
