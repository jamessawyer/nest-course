import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 允许接口请求的所有属性
      forbidNonWhitelisted: true, // 如果请求参数没有在 whitelist 中定义，则抛出异常
    }),
  );
  await app.listen(3000);
}
bootstrap();
