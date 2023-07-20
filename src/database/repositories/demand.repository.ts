import { Repository } from 'typeorm';
import { DemandEntity } from '../entities/demand.entity';
import { CustomRepository } from '../typeorm/typeorm-ex.decorator';
import { Injectable } from '@nestjs/common';
import BaseRepository from './base.repository';

@Injectable()
@CustomRepository(DemandEntity)
export class DemandRepository extends BaseRepository<DemandEntity> {
  async findBySlug(slug: string): Promise<DemandEntity | undefined> {
    return this.findOneBy({ slug });
  }
}
