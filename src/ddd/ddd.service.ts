import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateDddDto } from './dto/create-ddd.dto';
import { UpdateDddDto } from './dto/update-ddd.dto';
import { AaaService } from 'src/aaa/aaa.service';

@Injectable()
export class DddService {
  @Inject(forwardRef(() => AaaService))
  private readonly aaaService: AaaService;
  create(createDddDto: CreateDddDto) {
    return 'This action adds a new ddd';
  }

  findAll() {
    return `This action returns all ddd` + this.aaaService.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} ddd`;
  }

  update(id: number, updateDddDto: UpdateDddDto) {
    return `This action updates a #${id} ddd`;
  }

  remove(id: number) {
    return `This action removes a #${id} ddd`;
  }
}
