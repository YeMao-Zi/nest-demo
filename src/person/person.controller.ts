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
  UseFilters,
  Ip,
  Headers,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { LoginGuard } from 'src/login.guard';
import { TimeInterceptor } from 'src/time.interceptor';
import { ValidatePipe } from 'src/validate.pipe';
import { TestFilter } from 'src/test.filter';
import { Myheaders } from './person.decorator';

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
  // @UseInterceptors(TimeInterceptor)
  // @UseGuards(LoginGuard) // 添加路由守卫
  findAll(
    @Ip() ip: string,
    @Myheaders('Accept') headers1: any,
    @Headers('Accept') headers2: any,
  ) {
    console.log('ip: ', ip);
    console.log(headers1, 'headers', headers2);
    return this.personService.findAll();
  }

  @Get('query')
  query(@Query('name') name: String, @Query('age') age: number) {
    return `received： name: ${name}, age: ${age}`;
  }

  @Get(':id')
  @UseFilters(TestFilter)
  findOne(@Param('id', ValidatePipe) id: string) {
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
