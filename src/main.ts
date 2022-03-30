import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    // https://docs.nestjs.com/techniques/validation#using-the-built-in-validationpipe
    new ValidationPipe({
      whitelist: true, // 允许接口请求的所有属性
      forbidNonWhitelisted: true, // 如果请求参数没有在 whitelist 中定义，则抛出异常
      transform: true, // 尝试对原始类型进行转换，比如 string -> number
      transformOptions: {
        // 这样可以不用显式的使用 @Type() 装饰器了
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
