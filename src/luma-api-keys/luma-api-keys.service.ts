import { LumaAiService } from 'src/luma-ai/luma-ai.service';
import { CreateLumaApiKey_ResponseDto } from './dtos/response/create-luma-api-key.response.dto';
import { Injectable } from '@nestjs/common';
import { CreateLumaApiKey_RequestDto } from './dtos/request/create-luma-api-key.request.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LumaApiKeyRepository } from 'src/database/repositories/luma-api-key.repository';
import { LumaApiKeyEntity } from 'src/database/entities/luma-api-key.entity';
import { EVENTS } from 'src/events';

@Injectable()
export class LumaApiKeysService {
  /**
   *
   */
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly lumaApiKeyRepository: LumaApiKeyRepository,
    private readonly lumaAiService: LumaAiService,
  ) {}

  async createApiKey(createLumaApiKey_RequestDto: CreateLumaApiKey_RequestDto) {
    const lumaApiKey = await this.lumaApiKeyRepository.saveAndReload(
      createLumaApiKey_RequestDto,
    );
    this.eventEmitter.emit(EVENTS.luma.api.created, { lumaApiKey });
  }

  async updateRemainingApiKey(apiKey: LumaApiKeyEntity) {
    return await this.lumaApiKeyRepository.update(
      { id: apiKey.id },
      { remainingCredit: apiKey.remainingCredit },
    );
  }

  async getAvailableLumaApiKeys(): Promise<LumaApiKeyEntity[]> {
    const apiKeys = await this.lumaApiKeyRepository.find();
    Promise.all(
      apiKeys.map(async (apiKey) => {
        const info = await this.lumaAiService.getCredit(apiKey.apiKey);
        if (apiKey.remainingCredit != info.remaining)
          this.lumaApiKeyRepository.update(
            { id: apiKey.id },
            { remainingCredit: info.remaining },
          );
      }),
    );
    const availableApiKeys = apiKeys.filter(
      (apiKey) => apiKey.remainingCredit > 0,
    );
    availableApiKeys.sort((a, b) => b.remainingCredit - a.remainingCredit);

    return availableApiKeys;
  }
}
