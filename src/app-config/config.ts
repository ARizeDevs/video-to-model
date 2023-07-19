import { ConfigService } from '@nestjs/config';

export class Config<T> {
  protected _configurations: T = null;

  constructor(protected readonly configService: ConfigService) {
    this._configurations = configService.get<T>('appConfigurations');
  }

  get configurations(): T {
    return this._configurations;
  }
}
