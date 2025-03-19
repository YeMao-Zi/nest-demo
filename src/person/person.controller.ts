import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { LoginGuard } from 'src/login.guard';

@Controller('api/person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Inject('testPrivide')
  private testPrivide: { name: string; age: number };
  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Post('upload')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads/',
    }),
  )
  upload(
    @Body() createPersonDto: CreatePersonDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return `received: ${JSON.stringify(createPersonDto)}`;
  }

  @Get()
  // @UseGuards(LoginGuard) // 添加路由守卫
  findAll() {
    return this.personService.findAll();
  }

  @Get('query')
  query(@Query('name') name: String, @Query('age') age: Number) {
    return `received： name: ${name}, age: ${age}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const testPrivide = this.testPrivide;
    return this.personService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
