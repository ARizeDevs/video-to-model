import { Repository } from 'typeorm';

import { BaseEntity } from '../entities/base.entity';

class BaseRepository<T extends BaseEntity<T>> extends Repository<T> {}

export default BaseRepository;
