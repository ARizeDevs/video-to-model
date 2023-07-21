import { CreateCapture_ResponseDto } from 'src/luma-ai/dtos/response/create-capture.response.dto';
import { LumaAiService } from '../../../../luma-ai/luma-ai.service';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LoggerService } from 'src/core/logger/logger.service';
import { EVENTS } from 'src/events';
import { SlackUtilsService } from 'src/slack-utils/slack-utils.service';
import { LumaApiKeyEntity } from 'src/database/entities/luma-api-key.entity';
import { LumaApiKeysService } from 'src/luma-api-keys/luma-api-keys.service';

@Injectable()
export class LumaApiKeyCreatedEventHandler {
  /**
   *
   */
  constructor(
    private readonly loggerService: LoggerService,
    private readonly slackUtilsService: SlackUtilsService,
    private readonly lumaAiService: LumaAiService,
    private readonly lumaApiKeysService: LumaApiKeysService,
  ) {}

  @OnEvent(EVENTS.luma.api.created)
  async event({ lumaApiKey }: { lumaApiKey: LumaApiKeyEntity }) {
    const credit = await this.lumaAiService.getCredit(lumaApiKey.apiKey);
    await this.lumaApiKeysService.updateRemainingApiKey({
      ...lumaApiKey,
      remainingCredit: credit.remaining,
    });
  }
}
