import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  // { each: true } 表示这是一个字符串数组
  @IsString({ each: true })
  readonly flavors: string[];
}
