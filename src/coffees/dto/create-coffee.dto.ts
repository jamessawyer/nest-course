import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'coffee名字' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'coffee品牌' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ example: [] })
  // { each: true } 表示这是一个字符串数组
  @IsString({ each: true })
  readonly flavors: string[];
}
