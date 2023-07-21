import { DeepPartial, Repository } from 'typeorm';

import { BaseEntity } from '../entities/base.entity';
import { v4 as uuidv4 } from 'uuid';

class BaseRepository<T extends BaseEntity<T>> extends Repository<T> {
  async saveAndReload(entity: DeepPartial<T>): Promise<T> {
    // Call the original save method from the parent class
    if (!entity.uid) entity.uid = uuidv4();
    const savedEntity = await super.save(entity, { reload: true });

    return savedEntity;
  }

  async findByUid(uid: string): Promise<T | undefined> {
    return this.findOneBy({ uid } as any);
  }
}

export default BaseRepository;
