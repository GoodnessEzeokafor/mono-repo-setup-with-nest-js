import { Injectable } from '@nestjs/common';

@Injectable()
export class RecoveryWorkerService {
  getHello(): string {
    return 'Hello World!';
  }
}
