import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateLumaApiKey_RequestDto {
  constructor(data: Partial<CreateLumaApiKey_RequestDto>) {
    Object.assign(this, data);
  }

  @IsString()
  apiKey: string;

  @IsEmail()
  email: string;
}
