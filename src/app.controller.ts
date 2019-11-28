import { Controller, Get, Query, Res, Header, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { StaticMapGETDto } from './requests.dto';

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
  async getStaticMap(@Res() response, @Query() query: StaticMapGETDto){
    return (await this.appService.getStaticMap(query)).pipe(response);
  }
  @Post('staticmap')
  @Header('Content-Type', 'image/png')
  @Header('Content-Disposition', 'attachment; filename=lepicture.png')
  async postStaticMap(@Res() response, @Body('size') size: Size, @Body('color') color: string, @Body('waypoints') waypoints: number[][], @Body('weight') weight: number){
    return (await this.appService.postStaticMap(size, color, waypoints, weight)).pipe(response);
  }
}
