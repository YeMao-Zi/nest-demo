import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
import { DddService } from 'src/ddd/ddd.service';

@Injectable()
export class AaaService {
  @Inject(forwardRef(() => DddService))
  private readonly dddService: DddService;
  create(createAaaDto: CreateAaaDto) {
    return 'This action adds a new aaa';
  }

  findAll() {
    return `This action returns all aaa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aaa` + this.dddService.findOne(id);
  }

  update(id: number, updateAaaDto: UpdateAaaDto) {
    return `This action updates a #${id} aaa`;
  }

  remove(id: number) {
    return `This action removes a #${id} aaa`;
  }
}
