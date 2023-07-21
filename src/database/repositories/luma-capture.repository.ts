import { CustomRepository } from '../typeorm/typeorm-ex.decorator';
import { Injectable } from '@nestjs/common';
import BaseRepository from './base.repository';
import { LumaCaptureEntity } from '../entities/luma-capture.entity';

@Injectable()
@CustomRepository(LumaCaptureEntity)
export class LumaCaptureRepository extends BaseRepository<LumaCaptureEntity> {
  async findBySlug(slug: string): Promise<LumaCaptureEntity | undefined> {
    return this.findOneBy({ slug });
  }
}
