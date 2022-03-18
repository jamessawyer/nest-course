import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  // @Res 使用原生底层的express response对象
  // 这样做会失去使用nest框架封装的一些特性，比如interceptors等等
  // @Get()
  // findAll(@Res response) {
  //   response.status(200).send('this action return all coffees')
  // }
  @Get()
  findAll(@Query() query): string {
    const { limit, offset } = query;
    return `This action returns all coffees (limit: ${limit}, offset: ${offset})`;
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `coffee id: ${id}`;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: string) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `this action updates a #${id} with ${body}`;
  }

  @Delete(':id')
  return(@Param('id') id: string) {
    return `this action deletes a #${id}`;
  }
}
