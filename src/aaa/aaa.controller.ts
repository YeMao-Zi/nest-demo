import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseFilters,
  SetMetadata,
  VERSION_NEUTRAL,
  Version,
  Headers,
} from '@nestjs/common';
import { AaaService } from './aaa.service';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
import { LoginGuard } from 'src/login.guard';
import { AaaFilter } from './aaa.filter';
import { AaaExpertion } from './aaa.exceptions';
import { AaaGuard } from './aaa.guard';

@Controller({
  path: 'aaa',
  version: VERSION_NEUTRAL,
})
export class AaaController {
  constructor(private readonly aaaService: AaaService) {}

  @Post()
  create(@Body() createAaaDto: CreateAaaDto) {
    return this.aaaService.create(createAaaDto);
  }

  @Get()
  // @UseFilters(AaaFilter)
  @UseGuards(AaaGuard)
  @SetMetadata('roles', ['admin'])
  // @UseGuards(LoginGuard) // 添加路由守卫
  findAll() {
    // throw new AaaExpertion('123', '456');
    return this.aaaService.findAll();
  }

  @Get(':id')
  @Version(['1']) // 指定版本号
  findOneV1(@Param('id') id: string, @Headers() headers: any) {
    return `id(v${headers.version}):${id}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aaaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAaaDto: UpdateAaaDto) {
    return this.aaaService.update(+id, updateAaaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aaaService.remove(+id);
  }
}
