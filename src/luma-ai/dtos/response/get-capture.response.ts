import { Expose } from 'class-transformer';

export class GetCapture_ResponseDto {
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

  @Expose()
  latestRun: {
    status: string;

    progress: number;

    currentStage: string;

    artifacts: any[];
  };
}
