import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation';

import * as bodyParser from 'body-parser';

import * as cluster from 'cluster';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.useGlobalPipes(new ValidationPipe);
  app.enableCors();
  await app.listen(3000, '0.0.0.0');
}
// bootstrap();

if (cluster.isMaster) {

  let cpuCount = require('os').cpus().length;
  console.log('cpu count', cpuCount);
  // Create a worker for each CPU
  if (cpuCount > 4) { cpuCount = 4; }
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }
  // Code to run if we're in a worker process
} else {
  bootstrap();
}

// Listen for dying workers
cluster.on('exit',  worker =>  {
  console.log('Worker %d died :(', worker.id);
  cluster.fork();
})