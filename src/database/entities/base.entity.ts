import { PrimaryGeneratedColumn, CreateDateColumn, Column } from 'typeorm';

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
}
