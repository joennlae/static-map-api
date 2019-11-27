import { Controller, Get, Query, Res, Header } from '@nestjs/common';
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
  @Header('Content-Type', 'image/png')
  @Header('Content-Disposition', 'attachment; filename=lepicture.png')
  async getStaticMap(@Res() response, @Query() query: StaticMapDto){
    return (await this.appService.getStaticMap(query)).pipe(response);
  }
}
