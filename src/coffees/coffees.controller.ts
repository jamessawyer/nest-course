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
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { Public } from '../common/decorators/public.decorator';
import { Protocol } from '../common/decorators/protocol.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CoffeesService } from './coffees.service';

@ApiTags('coffees相关接口')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}
  // @Res 使用原生底层的express response对象
  // 这样做会失去使用nest框架封装的一些特性，比如interceptors等等
  // @Get()
  // findAll(@Res response) {
  //   response.status(200).send('this action return all coffees')
  // }
  @ApiForbiddenResponse({ description: '禁止访问' })
  @Public()
  @Get()
  async findAll(
    @Protocol('https') protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    console.log('protocol: ', protocol);
    // await new Promise((resolve) => setTimeout(() => resolve('ok'), 5000));
    return this.coffeesService.findAll(paginationQuery);
  }

  // 这里使用 Validation transform 进行类型转换
  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coffeesService.findOne('' + id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
