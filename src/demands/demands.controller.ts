import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DemandsService } from './demands.service';
import { CreateDemand_RequestDto, CreateDemand_ResponseDto } from './dtos';
import { ARizeGuard } from 'src/guards/arize.guard';

@Controller('demands')
@UseGuards(ARizeGuard)
export class DemandsController {
  constructor(private demandService: DemandsService) {}

  @Post()
  async createDemand(@Body() createDemandDto: CreateDemand_RequestDto) {
    return new CreateDemand_ResponseDto(
      await this.demandService.createDemand(createDemandDto),
    );
  }
}
