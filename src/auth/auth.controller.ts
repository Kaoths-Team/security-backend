import { Body, Controller, Post, Request } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./auth.dto";
import { UserEntity } from '../entities/user.entity';
import { PublicAPI } from '../decorator/public-api.decorator';


@PublicAPI()
@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Body() credential: AuthCredentialsDto) {
    return this.authService.login(credential);
  }

  @Post("register")
  async register(@Body() user: UserEntity) {
    return this.authService.register(user);
  }
}