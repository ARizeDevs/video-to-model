import { LumaAiService } from './../../../luma-ai/luma-ai.service';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LoggerService } from 'src/core/logger/logger.service';
import { DemandEntity } from 'src/database/entities/demand.entity';
import { EVENTS } from 'src/events';
import { SlackUtilsService } from 'src/slack-utils/slack-utils.service';

@Injectable()
export class CaptureCreatingEventHandler {
  /**
   *
   */
  constructor(
    private readonly loggerService: LoggerService,
    private readonly slackUtilsService: SlackUtilsService,
    private readonly lumaAiService: LumaAiService,
  ) {}

  @OnEvent(EVENTS.luma.capture.creating)
  async CaptureCreatingEvent(obj?: { title: string }) {
    const credit = await this.lumaAiService.getCredit();
    if (credit.remaining <= 10) {
      this.slackUtilsService.sendMessageDefaultChannel({
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              verbatim: false,
              text: `:warning: Your Luma's credit is under 10.`,
            },
          },
        ],
      });
    }
  }
}
