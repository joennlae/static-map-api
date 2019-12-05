import { Controller, Get, Query, Res, Header, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { StaticMapGETDto } from './requests.dto';
import { unlink } from 'fs';

import * as path from 'path';

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
    let time = new Date().getTime();
    let stream = await this.appService.getStaticMap(query, time)
    stream.on('close', function(){
      unlink(path.join(__dirname, '/tmp/created_image_' + time + '.png'), function() {});
    })
    return stream.pipe(response);
  }
  @Post('staticmap')
  @Header('Content-Type', 'image/png')
  @Header('Content-Disposition', 'attachment; filename=lepicture.png')
  async postStaticMap(@Res() response, @Body('size') size: Size, @Body('color') color: string, @Body('waypoints') waypoints: number[][], @Body('weight') weight: number){
    let time = new Date().getTime();
    let stream = await this.appService.postStaticMap(size, color, waypoints, weight, time)
    stream.on('close', function(){
      unlink(path.join(__dirname, '/tmp/created_image_' + time + '.png'), function() {});
    })
    return stream.pipe(response);
  }
}
