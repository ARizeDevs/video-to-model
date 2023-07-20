import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DemandService } from './demand.service';
import { CreateDemand_RequestDto, CreateDemand_ResponseDto } from './dtos';

@Controller('demand')
export class DemandController {
  constructor(private demandService: DemandService) {}

  @Get(':slug')
  async getDemandBySlug(@Param('slug') slug: string) {
    return this.demandService.findDemandBySlug(slug);
  }

  @Post()
  async createDemand(@Body() createDemandDto: CreateDemand_RequestDto) {
    return new CreateDemand_ResponseDto(
      await this.demandService.createDemand(createDemandDto),
    );
  }
}
