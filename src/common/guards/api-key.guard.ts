import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 这里使用 @Public 装饰的是方法 因此使用 context.getHandler()
    // 如果装饰的是类， 则需要使用 context.getClass()
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    // 如果标记了 @Public() 标记的方法，则不需要验证 api key
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    return authHeader === this.configService.get('API_KEY');
  }
}
