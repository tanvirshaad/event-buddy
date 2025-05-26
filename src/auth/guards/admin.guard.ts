import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/users/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const user = request.user as User;

    if (user && user.role === 'admin') {
      return true;
    }

    return false;
  }
}
