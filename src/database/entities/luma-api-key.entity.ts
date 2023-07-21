import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { v4 as uuid } from 'uuid';
import { DemandEntity } from './demand.entity';
import { LumaCaptureEntity } from './luma-capture.entity';

@Entity('luma-api-keys')
export class LumaApiKeyEntity extends BaseEntity<LumaApiKeyEntity> {
  @Column()
  email: string;

  @Column({ unique: true })
  apiKey: string;

  @Column({ default: 0 })
  remainingCredit: number;

  @OneToMany(
    () => LumaCaptureEntity,
    (capture: LumaCaptureEntity) => capture.lumaApiKey,
  )
  lumaCaptures: LumaCaptureEntity[];
}
