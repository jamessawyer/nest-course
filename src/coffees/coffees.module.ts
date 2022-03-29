import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import coffeesConfig from './config/coffees.config';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule,
    ConfigModule.forFeature(coffeesConfig), // partial registration
  ],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
    { provide: COFFEE_BRANDS, useValue: ['Starbucks', 'Dunkin Donuts'] },
    // Async Providers
    // 异步注入，比如以一些依赖需要从数据库中查询数据之后再加载时才能创建
    // {
    //   provide: COFFEE_BRANDS,
    //   useFactory: () => async (connection: Connection) => {
    //     // const coffeeBrands = await connection.query('SELECT * FROM xxx');
    //     const coffeeBrands = await Promise.resolve([
    //       'Starbucks',
    //       'Dunkin Donuts',
    //     ]);
    //     return coffeeBrands;
    //   },
    //   inject: [Connection],
    // },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
