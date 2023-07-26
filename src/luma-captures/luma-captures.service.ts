import { Not } from 'typeorm';
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

  async update(
    id: number,
    lumaCapture: Partial<LumaCaptureEntity>,
  ): Promise<LumaCaptureEntity> {
    await this.lumaCaptureRepository.update({ id }, lumaCapture);
    return await this.lumaCaptureRepository.findOneBy({ id });
  }

  async getInprogressCaptures() {
    const captures = await this.lumaCaptureRepository.find({
      where: {
        progress: Not(100),
        status: Not('completed'),
      },
      relations: ['lumaApiKey', 'demand'], // Replace with actual relation names
    });

    return captures;
  }
}
