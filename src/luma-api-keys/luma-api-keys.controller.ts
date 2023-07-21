import { Body, Controller, Post } from '@nestjs/common';
import { LumaApiKeysService } from './luma-api-keys.service';
import { CreateLumaApiKey_RequestDto } from './dtos/request/create-luma-api-key.request.dto';

@Controller('luma-api-keys')
export class LumaApiKeysController {
  /**
   *
   */
  constructor(private readonly lumaApiKeysService: LumaApiKeysService) {}

  @Post()
  async createLumaApiKey(
    @Body() createLumaApiKey_RequestDto: CreateLumaApiKey_RequestDto,
  ) {
    return await this.lumaApiKeysService.createApiKey(
      createLumaApiKey_RequestDto,
    );
  }
}
