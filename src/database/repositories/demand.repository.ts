import { EntityRepository, Repository } from 'typeorm';
import { DemandEntity } from '../entities/demand.entity';

@EntityRepository(DemandEntity)
export class DemandRepository extends Repository<DemandEntity> {
  async findBySlug(slug: string): Promise<DemandEntity | undefined> {
    return this.findOneBy({ slug });
  }
}
