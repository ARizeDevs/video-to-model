import { Controller, Get } from '@nestjs/common';
import { LumaAiService } from './luma-ai/luma-ai.service';

@Controller()
export class AppController {
  constructor(private readonly appService: LumaAiService) {}

  @Get()
  async getHello() {
    const result = await this.appService.getCredit();
    return result;
  }
}
