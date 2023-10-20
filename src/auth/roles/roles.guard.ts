import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UsersService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    const req = context.switchToHttp().getRequest();

    if (!req?.user?.id || !roles.length) return false;

    const userId = req.user.id;
    const user = this.userService.findOne(userId);

    if (roles.every((role) => user.role !== role)) return false;

    return true;
  }
}
