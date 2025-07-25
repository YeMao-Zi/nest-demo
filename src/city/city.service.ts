import { Injectable, NotFoundException } from '@nestjs/common';

import { City } from './entities/city.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CityService {
  @InjectEntityManager()
  private readonly entityManager: EntityManager;

  @InjectRepository(City)
  private readonly cityRepository: Repository<City>;
  async create(cityData: Partial<City>, parentId?: number) {
    const city = this.cityRepository.create(cityData);
    if (parentId) {
      const parent = await this.findOne(parentId);
      if (parent) {
        city.parent = parent;
      }
    }
    await this.cityRepository.save(city);
  }

  findAll() {
    // loadRelationIds 选项直接加载关系 ID，为返回数据加上 parentId 字段，(默认是不添加的)
    return this.cityRepository.find({
      loadRelationIds: {
        relations: ['parent'],
      },
    });
  }

  findTreeAll() {
    return this.entityManager.getTreeRepository(City).findTrees();
  }

  async findOne(id: number) {
    const city = await this.cityRepository.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });

    if (!city) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }
    return city;
  }

  async update(id: number, updateCityDto: Partial<City>, newParentId?: number) {
    const city = await this.findOne(id);
    if (city) {
      Object.assign(city, updateCityDto);

      if (newParentId !== undefined) {
        if (newParentId === null) {
          city.parent = null; // 设为根节点
        } else if (newParentId !== city.parent?.id) {
          city.parent = await this.findOne(newParentId);
        }
      }
      await this.cityRepository.save({ id, ...updateCityDto });
    }
  }

  async remove(id: number) {
    const city = await this.findOne(id);
    if (!city) {
      throw new Error('city not found');
    }
    await this.cityRepository.remove(city);
    // const descendants = await this.cityRepository.findDescendants(city);
  }
}
