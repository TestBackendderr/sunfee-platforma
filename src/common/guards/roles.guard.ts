import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { ERROR_MESSAGES } from '../constants';

interface User {
  role: string;
}

interface AuthRequest extends Request {
  user?: User;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest<AuthRequest>();
    const user = request.user;

    if (!user || !user.role) {
      throw new ForbiddenException(ERROR_MESSAGES.UNAUTHENTICATED);
    }

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException(ERROR_MESSAGES.FORBIDDEN_ROLE(user.role));
    }

    return true;
  }
}
