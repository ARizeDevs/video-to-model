import { Expose } from 'class-transformer';

export class CreateLumaApiKey_ResponseDto {
  constructor(data: Partial<CreateLumaApiKey_ResponseDto>) {
    Object.assign(this, data);
  }

  @Expose()
  apiKey: string;

  @Expose()
  email: string;

  @Expose()
  remainCredit: number;
}
