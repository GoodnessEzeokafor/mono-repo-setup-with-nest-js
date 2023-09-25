import { Module } from '@nestjs/common';
import { RecoveryWorkerController } from './recovery-worker.controller';
import { RecoveryWorkerService } from './recovery-worker.service';

@Module({
  imports: [],
  controllers: [RecoveryWorkerController],
  providers: [RecoveryWorkerService],
})
export class RecoveryWorkerModule {}
