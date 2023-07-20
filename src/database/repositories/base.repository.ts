import { DeepPartial, Repository } from 'typeorm';

import { BaseEntity } from '../entities/base.entity';

class BaseRepository<T extends BaseEntity<T>> extends Repository<T> {
  async saveAndReload(entity: DeepPartial<T>): Promise<T> {
    // Call the original save method from the parent class
    const savedEntity = await super.save(entity, { reload: true });

    return savedEntity;
  }
}

export default BaseRepository;
