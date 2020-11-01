import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PostEntity } from './post.entity';
import { CommentEntity } from './comment.entity';
import { UserRole } from '../user/user.dto';
import { hashSync } from 'bcryptjs';

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

  @CreateDateColumn({ readonly: true })
  createdAt!: Date;

  @UpdateDateColumn({ readonly: true })
  updatedAt!: Date;

  @DeleteDateColumn({ readonly: true })
  deletedAt!: Date;

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    if (this.password) this.password = hashSync(this.password, 12);
  }
}
