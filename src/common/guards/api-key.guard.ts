import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    // 这里直接使用了 process.env 的写法
    // 之前使用在构造器中注入 ConfigService 的方式 有点问题，暂时没找到解决办法
    return authHeader === process.env.API_KEY;
  }
}
