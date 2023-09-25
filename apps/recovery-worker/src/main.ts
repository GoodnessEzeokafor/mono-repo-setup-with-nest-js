import { NestFactory } from '@nestjs/core';
import { RecoveryWorkerModule } from './recovery-worker.module';

async function bootstrap() {
  const app = await NestFactory.create(RecoveryWorkerModule);
  await app.listen(3000);
}
bootstrap();
