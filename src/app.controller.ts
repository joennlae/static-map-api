import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { StaticMapDto } from './requests.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('staticmap')
  async getStaticMap(@Query() query: StaticMapDto): Promise<string>{
    return await this.appService.getStaticMap(query);
  }
}
