import { DemandRepository } from './demand.repository';
import { LumaApiKeyRepository } from './luma-api-key.repository';
import { LumaCaptureRepository } from './luma-capture.repository';

export const repositories = [
  DemandRepository,
  LumaApiKeyRepository,
  LumaCaptureRepository,
];
