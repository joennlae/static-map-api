import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation';

import * as bodyParser from 'body-parser';

import * as cluster from 'cluster';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({limit: '50mb'}));
  app.useGlobalPipes(new ValidationPipe);
  app.enableCors();
  await app.listen(3000, '0.0.0.0');
}
//bootstrap();


if (cluster.isMaster) {

  var cpuCount = require('os').cpus().length;
  console.log('cpu count', cpuCount);
  // Create a worker for each CPU
  if(cpuCount > 4) cpuCount = 4;
  for (var i = 0; i < cpuCount; i += 1) {
      cluster.fork();
  }
// Code to run if we're in a worker process
} else {
  bootstrap();
}

// Listen for dying workers
cluster.on('exit', function (worker) {

  // Replace the dead worker,
  // we're not sentimental
  console.log('Worker %d died :(', worker.id);
  cluster.fork();

});