import { LumaAiService } from './../../../luma-ai/luma-ai.service';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LoggerService } from 'src/core/logger/logger.service';
import { DemandEntity } from 'src/database/entities/demand.entity';
import { DemandsService } from 'src/demands/demands.service';
import { EVENTS } from 'src/events';
import { LumaApiKeysService } from 'src/luma-api-keys/luma-api-keys.service';
import { LumaCapturesService } from 'src/luma-captures/luma-captures.service';
import { SharedService } from 'src/shared/shared.service';
import { SlackUtilsService } from 'src/slack-utils/slack-utils.service';

@Injectable()
export class DemandCreatedEventHandler {
  /**
   *
   */
  constructor(
    private readonly loggerService: LoggerService,
    private readonly slackUtilsService: SlackUtilsService,
    private readonly lumaApiKeysService: LumaApiKeysService,
    private readonly lumaAiService: LumaAiService,
    private readonly lumaCapturesService: LumaCapturesService,
    private readonly sharedService: SharedService,
  ) {}

  @OnEvent(EVENTS.demand.demandCreated)
  async demandCreatedEvent({ demand }: { demand: DemandEntity }) {
    const lumaApiKeys = await this.lumaApiKeysService.getAvailableLumaApiKeys();
    if (!lumaApiKeys.length) {
      this.slackUtilsService.sendWarningMessageDefaultChannel(
        `You don't have any available Luma Api Keys`,
      );
      return;
    }

    const lumaApiKey = lumaApiKeys[0];

    const capture = await this.lumaAiService.createCapture(
      lumaApiKey.apiKey,
      `${demand.name} - InProgress`,
    );

    const lumaCapture = await this.lumaCapturesService.create({
      lumaApiKeyId: lumaApiKey.id,
      signedUrl: capture.signedUrls.source,
      demandId: demand.id,
      capture: capture,
      slug: capture.capture.slug,
    });

    await this.lumaAiService.upload(demand.videoUrl, lumaCapture.signedUrl);

    await this.lumaAiService.triggerCapture(
      lumaApiKey.apiKey,
      lumaCapture.slug,
    );

    await this.sharedService.updateLumaRemainingCredit(lumaApiKey);
  }
}
