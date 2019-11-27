import { Injectable, Res } from '@nestjs/common';
import { StaticMapDto } from './requests.dto';
import { PuppeteerService } from './puppeteer.service';
import { createReadStream } from 'fs';

import * as path from 'path';
@Injectable()
export class AppService {
  constructor(public puppeteerService: PuppeteerService){
  }
  getHello(): string {
    return 'Hello World!';
  }
  async getStaticMap(query: StaticMapDto) {
    console.log('query', query)
    let tmpSize = query.size.split('x');
    let size: Size = {
      width: parseInt(tmpSize[0]), 
      height: parseInt(tmpSize[1])
    }
    let path_splitted = query.path.split('|');
    let color = path_splitted[0].split(':')[1];
    let weight = parseInt(path_splitted[1].split(':')[1]);
    path_splitted.splice(0, 2);
    let waypointsString = path_splitted;
    let finalWaypoints: number[][] = [];
    for (let i = 0; i < waypointsString.length; i++) {
      let tmp: number[] = [
        parseFloat(waypointsString[i].split(',')[0]),
        parseFloat(waypointsString[i].split(',')[1])
      ]
      finalWaypoints.push(tmp);
    }
    console.log('data', finalWaypoints, size, weight, color);
    await this.puppeteerService.createImage(finalWaypoints, size, weight, color);
    return createReadStream(path.join(__dirname, 'tmp/test.png'));
  }
  async postStaticMap(size: Size, color: string, waypoints: number[][], weight: number) {
    console.log('data', waypoints, size, weight, color);
    await this.puppeteerService.createImage(waypoints, size, weight, color);
    return createReadStream(path.join(__dirname, 'tmp/test.png'));
  }
}
