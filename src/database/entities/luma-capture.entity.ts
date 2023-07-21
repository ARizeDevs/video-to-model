import { CreateCapture_ResponseDto } from 'src/luma-ai/dtos/response/create-capture.response.dto';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { v4 as uuid } from 'uuid';
import { LumaApiKeyEntity } from './luma-api-key.entity';
import { DemandEntity } from './demand.entity';

@Entity('luma-captures')
export class LumaCaptureEntity extends BaseEntity<LumaCaptureEntity> {
  @Column('uuid', { nullable: false })
  slug: string;

  @Column({ nullable: true })
  signedUrl: string;

  @Column({ type: 'jsonb' })
  capture: CreateCapture_ResponseDto;

  /// Luma Api Key Entity

  @Column({ nullable: true })
  lumaApiKeyId: number;

  @ManyToOne(
    () => LumaApiKeyEntity,
    (api: LumaApiKeyEntity) => api.lumaCaptures,
  )
  @JoinColumn({ name: 'lumaApiKeyId' })
  lumaApiKey: LumaApiKeyEntity;

  /// Demand

  @Column({ nullable: true })
  demandId: number;

  @ManyToOne(() => DemandEntity, (demand: DemandEntity) => demand.lumaCaptures)
  @JoinColumn({ name: 'demandId' })
  demand: DemandEntity;
}
