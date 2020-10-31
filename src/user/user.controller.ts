import { Controller, Get } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { User } from '../decorator/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  @Get('me')
  async getMe(@User() user: UserEntity): Promise<UserEntity> {
    return user;
  }
}
