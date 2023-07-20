import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export abstract class BaseEntity<T> {
  constructor(partial: Partial<T> = {}) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column('uuid', { unique: true })
  uid: string;

  @BeforeInsert()
  generateUid() {
    this.uid = uuidv4();
  }
}
