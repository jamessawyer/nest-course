课程地址：
  - https://courses.nestjs.com/

b站地址：
  - https://www.bilibili.com/video/BV1T44y1W7Si

启动docker: 注意这里的postgres端口设置为了 `5731`，而不是默认的5732
```bash
docker-compose exec db /bin/bash
```

开发：
```bash
pnpm run start:dev
```

swagger 地址：
```
http://localhost:3000/api
```

常用命令：
```bash
# 生成模块
nest g mo coffees

nest g controller coffees

# 生成serives
nest g service coffees

# 不生产 spec.ts 测试文件
nest g controller coffees --no-spec

nest g common/dto/pagination-query.dto --no-spec

# 生成各种模块 下面生成的文件位于common文件夹下
nest g pipe common/pipes/parse-int
nest g middleware common/middlewares/logging
nest g interceptro common/interceptros/timeout
nest g guard common/guards/api-kiy
nest g filter common/filters/http-exception
nest g decorator common/decorators/protocol


# 只测试一个文件
pnpm run test:watch -- coffees.service
```