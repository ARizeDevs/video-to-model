import { CreateCapture_ResponseDto } from 'src/luma-ai/dtos/response/create-capture.response.dto';
import { LumaAiService } from './../../../luma-ai/luma-ai.service';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LoggerService } from 'src/core/logger/logger.service';
import { DemandEntity } from 'src/database/entities/demand.entity';
import { EVENTS } from 'src/events';
import { SlackUtilsService } from 'src/slack-utils/slack-utils.service';

@Injectable()
export class CaptureCreatedEventHandler {
  /**
   *
   */
  constructor(
    private readonly loggerService: LoggerService,
    private readonly slackUtilsService: SlackUtilsService,
    private readonly lumaAiService: LumaAiService,
  ) {}

  @OnEvent(EVENTS.luma.capture.created)
  async CaptureCreatedEvent(obj?: { data: CreateCapture_ResponseDto }) {
    this.loggerService.verbose('Capture created');
  }
}
