import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;
}

export class CreateCommentDto extends UpdateCommentDto {
  @ApiProperty()
  postId: number;
}
