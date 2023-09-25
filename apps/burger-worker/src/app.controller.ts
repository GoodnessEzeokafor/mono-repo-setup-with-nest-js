import {
  MAKE_BURGER_FAILURE_PATTERN,
  MAKE_BURGER_PATTERN,
  MAKE_BURGER_SUCCESS_PATTERN,
  MakeBurgerPayload,
  MakeBurgerSuccessPayload,
  queueOptions,
} from '@app/shared';
import { Controller, Get, Inject, Logger } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  pattyCount = 0;
  constructor(
    @Inject(queueOptions.burger.name) private burgerQueue: ClientProxy,
  ) {}

  @EventPattern(MAKE_BURGER_PATTERN)
  makeBurgerEvent(
    @Payload() payload: MakeBurgerPayload,
    @Ctx() context: RmqContext,
  ) {
    try {
      this.makeBurger(payload.patties);
      this.emitBurgerSuccess({ customer: payload.customer });
      context.getChannelRef().ack(context.getMessage());
    } catch (_) {
      Logger.warn(
        `An error occured while preparing the burger for ${payload.customer}.`,
      );

      // reject message and set reque = false
      // this will dead letter our message
      context.getChannelRef().reject(context.getMessage(), false);
    }
  }

  @EventPattern(MAKE_BURGER_SUCCESS_PATTERN)
  makeBurgerSuccessEvent(
    @Payload() payload: MakeBurgerPayload,
    @Ctx() context: RmqContext,
  ) {
    Logger.log(`Burger for ${payload.customer} is ready`);
    context.getChannelRef().ack(context.getMessage());
  }

  @EventPattern(MAKE_BURGER_FAILURE_PATTERN)
  makeBurgerFailureEvent(
    @Payload() payload: MakeBurgerPayload,
    @Ctx() context: RmqContext,
  ) {
    Logger.error(
      `Burger for ${payload.customer} couldn't be prepared. Will not retry 🔥`,
    );
    context.getChannelRef().ack(context.getMessage());
  }

  private makeBurger(patties: number) {
    for (let i = 0; i < patties; i++) {
      this.pattyCount++;
      if (this.pattyCount % 3 === 0) {
        throw Error('Dropped patty');
      }
    }
  }

  private emitBurgerSuccess(payload: MakeBurgerSuccessPayload) {
    this.burgerQueue.emit(MAKE_BURGER_SUCCESS_PATTERN, payload);
  }
}
