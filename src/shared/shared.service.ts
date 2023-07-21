import { LumaApiKeysService } from 'src/luma-api-keys/luma-api-keys.service';
import { LumaAiService } from './../luma-ai/luma-ai.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
  /**
   *
   */
  constructor(
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
}
