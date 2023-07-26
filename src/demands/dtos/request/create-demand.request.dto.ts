import { IsNotEmpty, IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateDemand_RequestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsUrl()
  videoUrl: string;

  @IsOptional()
  @IsString()
  callbackUrl: string;
}
