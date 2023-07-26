import { LumaApiKeysService } from 'src/luma-api-keys/luma-api-keys.service';
import { LumaAiService } from './../luma-ai/luma-ai.service';
import { Injectable } from '@nestjs/common';
import { DemandEntity } from 'src/database/entities/demand.entity';
import axios from 'axios';
import { LoggerService } from 'src/core/logger/logger.service';

@Injectable()
export class SharedService {
  /**
   *
   */
  constructor(
    private readonly loggerService: LoggerService,
    private readonly lumaAiService: LumaAiService,
    private readonly lumaApiKeysService: LumaApiKeysService,
  ) {}

  async updateLumaRemainingCredit(lumaApiKey) {
    const credit = await this.lumaAiService.getCredit(lumaApiKey.apiKey);
    await this.lumaApiKeysService.updateRemainingApiKey({
      ...lumaApiKey,
      remainingCredit: credit.remaining,
    });
  }

  async callbackDemand(demand: DemandEntity, data: object) {
    try {
      const result = await axios.post(
        demand.callbackUrl,
        {
          slug: demand.uid,
          hasError: false,
          ...data,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'json',
        },
      );
    } catch (error) {
      this.loggerService.error(error);
      debugger;
    }
  }
}
