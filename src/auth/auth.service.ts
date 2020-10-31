import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../entities/user.entity';
import { compareSync } from 'bcryptjs';
import { AuthCredentialsDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser({ username, password }: AuthCredentialsDto): Promise<any> {
    const user: UserEntity = await this.userService.findByUsernameWithPassword(
      username
    );
    if (user && compareSync(password, user.password)) {
      const { password, ...userDto } = user;
      return userDto;
    }
    return null;
  }

  async login(credential: AuthCredentialsDto): Promise<string> {
    const user: UserEntity = await this.validateUser(credential);
    if (!user) {
      throw new UnauthorizedException('Wrong username or password');
    }
    return this.jwtService.sign(user);
  }

  async register(user: UserEntity): Promise<string> {
    const existedUser = await this.userService.findOne({
      username: user.username,
    });
    if (existedUser) {
      throw new BadRequestException('Username already existed');
    }
    await this.userService.create(user);
    return this.login({ username: user.username, password: user.password });
  }
}
