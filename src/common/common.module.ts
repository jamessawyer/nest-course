import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      // 可参考NestJS Fundamentals Course - Using Metadata to build Generic Guards or Interceptors
      // 如果 Guard 需要依赖注入， 则必须在Module中提供
      // 而不能使用 app.useGlobalGuards(new ApiKeyGuard()) 这种方式
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class CommonModule {}
