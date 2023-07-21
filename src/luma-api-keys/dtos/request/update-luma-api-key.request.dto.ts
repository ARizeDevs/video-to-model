import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UpdateLumaApiKey_RequestDto {
  constructor(data: Partial<UpdateLumaApiKey_RequestDto>) {
    Object.assign(this, data);
  }

  @IsString()
  apiKey: string;

  @IsEmail()
  email: string;
}
