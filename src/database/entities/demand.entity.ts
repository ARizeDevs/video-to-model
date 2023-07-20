import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { v4 as uuid } from 'uuid';

@Entity()
export class DemandEntity extends BaseEntity<DemandEntity> {
  @Column('uuid', { default: () => `'${uuid()}'` })
  slug: string;

  @Column()
  name: string;

  @Column({ default: '' })
  callbackUrl: string;

  @Column({ nullable: true })
  videoUrl: string;
}
