import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Reflector } from '@nestjs/core';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    @Inject('UserService') private readonly userService: UserService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndMerge('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    const user: UserEntity = await this.userService.findById(request.user.id);
    return roles.includes(user.role);
  }
}
