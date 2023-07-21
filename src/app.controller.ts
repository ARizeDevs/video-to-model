import { Controller, Get } from '@nestjs/common';
import { LumaAiService } from './luma-ai/luma-ai.service';

@Controller()
export class AppController {
  constructor(private readonly appService: LumaAiService) {}

  @Get()
  async getHello() {
    //
  }
}
