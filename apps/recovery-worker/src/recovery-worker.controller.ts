import { Controller, Get } from '@nestjs/common';
import { RecoveryWorkerService } from './recovery-worker.service';

@Controller()
export class RecoveryWorkerController {
  constructor(private readonly recoveryWorkerService: RecoveryWorkerService) {}

  @Get()
  getHello(): string {
    return this.recoveryWorkerService.getHello();
  }
}
