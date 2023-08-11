import { Injectable } from '@nestjs/common';
import { LumaAiService } from 'src/luma-ai/luma-ai.service';
import { LumaApiKeysService } from 'src/luma-api-keys/luma-api-keys.service';
import { LumaCapturesService } from 'src/luma-captures/luma-captures.service';
import { SharedService } from 'src/shared/shared.service';
import { LoggerService } from 'src/core/logger/logger.service';
import { SlackUtilsService } from 'src/slack-utils/slack-utils.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GetCapture_ResponseDto } from 'src/luma-ai/dtos/response/get-capture.response';

@Injectable()
export class SchedulerService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly slackUtilsService: SlackUtilsService,
    private readonly lumaApiKeysService: LumaApiKeysService,
    private readonly lumaAiService: LumaAiService,
    private readonly lumaCapturesService: LumaCapturesService,
    private readonly sharedService: SharedService,
  ) {}

  @Cron('*/20 * * * * *')
  async handleCron() {
    const inProgressCaptures =
      await this.lumaCapturesService.getInprogressCaptures();

    if (inProgressCaptures?.length > 0) {
      const distinctLumaApiKey = [
        ...new Set(
          inProgressCaptures.map((capture) => capture.lumaApiKey.apiKey),
        ),
      ];

      const captures: GetCapture_ResponseDto[] = [];

      await Promise.all(
        distinctLumaApiKey.map(async (apiKey) => {
          const lumaCaptures = await this.lumaAiService.getCaptures(apiKey, {
            search: 'inprogress',
          });
          captures.push(...lumaCaptures.captures);
        }),
      );

      //   this.loggerService.verbose(captures);

      await Promise.all(
        inProgressCaptures.map(async (capture) => {
          const mappedLumaCapture = captures.find(
            (x) => x.slug === capture.slug,
          );
          if (mappedLumaCapture.latestRun?.status === 'finished') {
            await this.lumaAiService.updateCapture(
              capture.lumaApiKey.apiKey,
              mappedLumaCapture.slug,
              {
                title: mappedLumaCapture.title.replace(' - InProgress', ''),
                privacy: 'private',
                location: {
                  latitude: 0,
                  longitude: 0,
                  name: 'from xyz showroom',
                  isVisible: false,
                },
              },
            );
            await this.lumaCapturesService.update(capture.id, {
              progress: 100,
              status: 'completed',
              getCapture: mappedLumaCapture,
            });

            this.sharedService.callbackDemand(capture.demand, {
              progress: 100,
              status: 'completed',
              extra: mappedLumaCapture,
              artifacts: mappedLumaCapture.latestRun?.artifacts,
            });
          } else if (mappedLumaCapture.latestRun?.currentStage === 'Failed') {
            await this.lumaCapturesService.update(capture.id, {
              progress: mappedLumaCapture.latestRun?.progress,
              status: 'failed',
              getCapture: mappedLumaCapture,
            });
            this.sharedService.callbackDemand(capture.demand, {
              progress: mappedLumaCapture.latestRun?.progress,
              status: 'failed',
              extra: mappedLumaCapture,
            });
          } else if (mappedLumaCapture.latestRun?.progress > 0) {
            await this.lumaCapturesService.update(capture.id, {
              progress: mappedLumaCapture.latestRun?.progress,
              status: 'in-progress',
              getCapture: mappedLumaCapture,
            });
            this.sharedService.callbackDemand(capture.demand, {
              progress: mappedLumaCapture.latestRun?.progress,
              status: 'in-progress',
              extra: mappedLumaCapture,
            });
          }
        }),
      );
    }
  }
}
