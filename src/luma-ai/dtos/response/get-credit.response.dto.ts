import { Expose } from 'class-transformer';

export class GetCredit_ResponseDto {
  /**
   *
   */
  constructor(data: Partial<GetCredit_ResponseDto>) {
    Object.assign(this, data);
  }

  @Expose()
  remaining: number;

  @Expose()
  used: number;

  @Expose()
  total: number;
}
