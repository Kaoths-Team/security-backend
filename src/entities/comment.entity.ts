import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { PostEntity } from './post.entity';
import { ApiProperty } from '@nestjs/swagger';

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

  @ManyToOne(() => PostEntity, post => post.comments)
  post: PostEntity;
}