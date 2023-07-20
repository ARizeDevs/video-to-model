import { Expose, Type } from 'class-transformer';

class CaptureType {
  @Expose()
  title: string;

  @Expose()
  type: string;

  @Expose()
  location: string | null;

  @Expose()
  privacy: string;

  @Expose()
  date: Date;

  @Expose()
  username: string;

  @Expose()
  status: string;

  @Expose()
  slug: string;
}

class SignedUrls {
  @Expose()
  source: string;
}

export class CreateCapture_ResponseDto {
  /**
   *
   */
  constructor(data: Partial<CreateCapture_ResponseDto>) {
    Object.assign(this, data);
  }

  @Expose()
  @Type(() => SignedUrls)
  signedUrls: SignedUrls;

  @Expose()
  @Type(() => CaptureType)
  capture: CaptureType;
}
