import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { LumaCaptureEntity } from './luma-capture.entity';

@Entity('demands')
export class DemandEntity extends BaseEntity<DemandEntity> {
  @Column()
  name: string;

  @Column({ default: '' })
  callbackUrl: string;

  @Column({ nullable: true })
  videoUrl: string;

  // @Column({ nullable: true, type: 'jsonb', default: {} })
  // extra: string;

  @OneToMany(
    () => LumaCaptureEntity,
    (capture: LumaCaptureEntity) => capture.lumaApiKey,
  )
  lumaCaptures: LumaCaptureEntity[];
}
