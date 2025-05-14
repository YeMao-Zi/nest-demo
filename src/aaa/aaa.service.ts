import { Inject } from '@nestjs/common';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
import { Test1Service } from './test1.service';

export class AaaService {
  @Inject()
  private readonly test1Service: Test1Service;

  create(createAaaDto: CreateAaaDto) {
    console.log(createAaaDto);
    return 'This action adds a new aaa';
  }

  findAll() {
    return `This action returns all aaa` + this.test1Service.get2();
  }

  findOne(id: number) {
    return `This action returns a #${id} aaa`;
  }

  update(id: number, updateAaaDto: UpdateAaaDto) {
    console.log(updateAaaDto);
    return `This action updates a #${id} aaa`;
  }

  remove(id: number) {
    return `This action removes a #${id} aaa`;
  }
}
