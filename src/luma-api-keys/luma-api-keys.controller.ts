import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LumaApiKeysService } from './luma-api-keys.service';
import { CreateLumaApiKey_RequestDto } from './dtos/request/create-luma-api-key.request.dto';
import { ARizeGuard } from 'src/guards/arize.guard';

@Controller('luma-api-keys')
@UseGuards(ARizeGuard)
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
