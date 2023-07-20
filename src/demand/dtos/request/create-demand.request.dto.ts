import { IsNotEmpty, IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateDemand_RequestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsUrl()
  videoUrl?: string;

  @IsOptional()
  @IsUrl()
  callbackUrl?: string;
}
