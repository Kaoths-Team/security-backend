import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PublicAPI } from './decorator/public-api.decorator';

@PublicAPI()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
