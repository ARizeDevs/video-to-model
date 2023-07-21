import { CreateLumaApiKey_ResponseDto } from './dtos/response/create-luma-api-key.response.dto';
import { Injectable } from '@nestjs/common';
import { CreateLumaApiKey_RequestDto } from './dtos/request/create-luma-api-key.request.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LumaApiKeyEntityRepository } from 'src/database/repositories/luma-api-key.repository';

@Injectable()
export class LumaApiKeysService {
  /**
   *
   */
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly lumaApiKeyEntityRepository: LumaApiKeyEntityRepository,
  ) {}

  createApiKey(createLumaApiKey_RequestDto: CreateLumaApiKey_RequestDto) {
    throw new Error('Method not implemented.');
  }
}
