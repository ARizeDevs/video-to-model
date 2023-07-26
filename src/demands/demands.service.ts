import { Injectable } from '@nestjs/common';
import { DemandEntity } from 'src/database/entities/demand.entity';
import { DemandRepository } from 'src/database/repositories/demand.repository';
import { CreateDemand_RequestDto } from './dtos/request/create-demand.request.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENTS } from 'src/events';

@Injectable()
export class DemandsService {
  constructor(
    private demandRepository: DemandRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createDemand(
    createDemandDto: CreateDemand_RequestDto,
  ): Promise<DemandEntity> {
    const demand = this.demandRepository.create(createDemandDto);
    this.eventEmitter.emit(EVENTS.demand.demandCreated, {
      demand,
    });
    return this.demandRepository.saveAndReload(demand);
  }
}
