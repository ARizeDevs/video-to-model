import { Expose, Type } from 'class-transformer';
import { GetCapture_ResponseDto } from './get-capture.response';

export class GetCaptures_ResponseDto {
  @Expose()
  remaining: number;

  @Expose()
  count: number;

  @Expose()
  @Type(() => GetCapture_ResponseDto)
  captures: GetCapture_ResponseDto[];
}
