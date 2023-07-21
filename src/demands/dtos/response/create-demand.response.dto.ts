import { Expose } from 'class-transformer';

export class CreateDemand_ResponseDto {
  /**
   *
   */
  constructor(data: Partial<CreateDemand_ResponseDto>) {
    Object.assign(this, data);
  }

  @Expose()
  name: string;

  @Expose()
  uid: string;
}
