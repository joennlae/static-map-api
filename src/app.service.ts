import { Injectable } from '@nestjs/common';
import { StaticMapDto } from './requests.dto';
import { PuppeteerService } from './puppeteer.service';

@Injectable()
export class AppService {
  constructor(public puppeteerService: PuppeteerService){
  }
  getHello(): string {
    return 'Hello World!';
  }
  getStaticMap(query: StaticMapDto): string {
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
    this.puppeteerService.createImage();
    return 'size: ' + size + ' color: ' + color + ' weight: ' + weight + ' waypoints: ' + finalWaypoints;
  }
}
