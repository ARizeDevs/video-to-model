import { Expose } from 'class-transformer';

export class TriggerCapture_ResponseDto {
  constructor(data: Partial<TriggerCapture_ResponseDto>) {
    Object.assign(this, data);
  }

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
