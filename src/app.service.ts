import { Inject, Injectable } from '@nestjs/common';
import { PersonService } from './person/person.service';
import { BbbService } from './bbb/bbb.service';

@Injectable()
export class AppService {
  constructor(private readonly bbbService: BbbService) {}

  @Inject(PersonService)
  private personService: PersonService;

  @Inject('bbbOptions')
  private bbbOptions: Record<string, any>;

  getHello(): string {
    return (
      'Hello World!' +
      this.personService.findAll() +
      JSON.stringify(this.bbbOptions) +
      this.bbbService.findAll()
    );
  }
}
