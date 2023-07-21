import { LumaCaptureEntity } from './../database/entities/luma-capture.entity';
import { LumaCaptureRepository } from './../database/repositories/luma-capture.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LumaCapturesService {
  /**
   *
   */
  constructor(private readonly lumaCaptureRepository: LumaCaptureRepository) {}

  async create(
    lumaCapture: Partial<LumaCaptureEntity>,
  ): Promise<LumaCaptureEntity> {
    return await this.lumaCaptureRepository.saveAndReload(lumaCapture);
  }
}
