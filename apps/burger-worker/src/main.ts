import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { queueOptions } from '@app/shared';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    // receive messages from the burger-queue
    queueOptions.burger,
  );
  app.listen().then(() => Logger.log('Burger worker is listening'));
}
bootstrap();
