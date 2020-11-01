import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PostEntity } from './post.entity';
import { CommentEntity } from './comment.entity';
import { UserRole } from '../user/user.dto';

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

  @Column('enum', { enum: UserRole })
  role: UserRole;

  @OneToMany(
    () => PostEntity,
    post => post.author
  )
  posts: PostEntity[];

  @OneToMany(
    () => CommentEntity,
    comment => comment.author
  )
  comments: CommentEntity[];
}
