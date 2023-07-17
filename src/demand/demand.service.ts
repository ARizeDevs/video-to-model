import { Injectable } from '@nestjs/common';
import { DemandEntity } from 'src/database/entities/demand.entity';
import { DemandRepository } from 'src/database/repositories/demand.repository';
import { CreateDemand_ReqDto } from './dto/req/create-demand.req.dto';

@Injectable()
export class DemandService {
  constructor(private demandRepository: DemandRepository) {}

  async createDemand(
    createDemandDto: CreateDemand_ReqDto,
  ): Promise<DemandEntity> {
    const demand = this.demandRepository.create(createDemandDto);
    return this.demandRepository.save(demand);
  }

  async findDemandBySlug(slug: string): Promise<DemandEntity | undefined> {
    return this.demandRepository.findBySlug(slug);
  }
}
