import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DemandService } from './demand.service';
import { CreateDemand_ReqDto } from './dto/req/create-demand.req.dto';

@Controller('demand')
export class DemandController {
  constructor(private demandService: DemandService) {}

  @Get(':slug')
  async getDemandBySlug(@Param('slug') slug: string) {
    return this.demandService.findDemandBySlug(slug);
  }

  @Post()
  async createDemand(@Body() createDemandDto: CreateDemand_ReqDto) {
    return this.demandService.createDemand(createDemandDto);
  }
}
