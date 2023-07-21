import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { v4 as uuid } from 'uuid';

@Entity('luma-api-keys')
export class LumaApiKeyEntity extends BaseEntity<LumaApiKeyEntity> {
  @Column()
  email: string;

  @Column()
  key: string;

  @Column()
  remainCredit: number;
}
