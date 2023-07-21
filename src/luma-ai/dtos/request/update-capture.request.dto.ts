import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class UpdateCapture_RequestDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsString()
  @IsOptional()
  privacy?: string;

  @IsOptional()
  @Type(() => LocationDto)
  @ValidateNested()
  location?: LocationDto;
}

class LocationDto {
  @IsNumber()
  latitude?: number;

  @IsNumber()
  longitude?: number;

  @IsString()
  name?: string;

  @IsBoolean()
  isVisible?: boolean;
}
