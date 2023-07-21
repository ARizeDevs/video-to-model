import { CustomRepository } from '../typeorm/typeorm-ex.decorator';
import { Injectable } from '@nestjs/common';
import BaseRepository from './base.repository';
import { LumaApiKeyEntity } from '../entities/luma-api-key.entity';

@Injectable()
@CustomRepository(LumaApiKeyEntity)
export class LumaApiKeyEntityRepository extends BaseRepository<LumaApiKeyEntity> {}
