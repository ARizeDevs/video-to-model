import { IsNotEmpty, IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateDemand_ReqDto {
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
