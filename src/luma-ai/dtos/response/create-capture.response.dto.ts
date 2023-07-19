import { Expose } from 'class-transformer';

export class CreateCapture_ResponseDto {
  @Expose()
  signedUrls: {
    source: string;
  };

  @Expose()
  capture: {
    title: string;
    type: string;
    location: string | null;
    privacy: string;
    date: Date;
    username: string;
    status: string;
    slug: string;
  };
}
