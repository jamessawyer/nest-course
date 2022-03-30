import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { LoggingMiddleware } from './middlewares/logging.middleware';

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
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
    // 中间件的几种配置方式
    // 只针对 'coffees' routes
    // consumer.apply(LoggingMiddleware).forRoutes('coffees');

    // 只对GET请求
    // consumer.apply(LoggingMiddleware).forRoutes({ path: 'coffees', method: RequestMethod.GET });

    // 排除 coffee routes
    // consumer.apply(LoggingMiddleware).exclude('coffee').forRoutes('*');
  }
}
