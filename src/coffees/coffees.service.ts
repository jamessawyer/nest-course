import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  async findAll() {
    return await this.coffeesRepository.find({
      relations: ['flavors'],
    });
  }

  async findOne(id: string) {
    const coffee = await this.coffeesRepository.findOne({
      where: { id: +id },
      relations: ['flavors'],
    });
    if (!coffee) {
      // throw new HttpException(`Coffee ${id} not found`, HttpStatus.NOT_FOUND);
      // nest使用下面形式提供了封装
      throw new NotFoundException(`Coffee ${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const coffee = this.coffeesRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return await this.coffeesRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    // patch时 只有传入了flavors才进行处理
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));

    const coffee = await this.coffeesRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee ${id} not found`);
    }
    return this.coffeesRepository.save(coffee);
  }

  async remove(id: string) {
    console.log('remove : ' + id);
    const coffee = await this.findOne(id);
    return await this.coffeesRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const flavor = await this.flavorRepository.findOne({
      where: { name },
    });
    if (flavor) {
      return flavor;
    }
    return this.flavorRepository.create({ name });
  }
}
