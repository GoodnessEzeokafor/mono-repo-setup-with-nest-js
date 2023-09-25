import { Test, TestingModule } from '@nestjs/testing';
import { RecoveryWorkerController } from './recovery-worker.controller';
import { RecoveryWorkerService } from './recovery-worker.service';

describe('RecoveryWorkerController', () => {
  let recoveryWorkerController: RecoveryWorkerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RecoveryWorkerController],
      providers: [RecoveryWorkerService],
    }).compile();

    recoveryWorkerController = app.get<RecoveryWorkerController>(RecoveryWorkerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(recoveryWorkerController.getHello()).toBe('Hello World!');
    });
  });
});
