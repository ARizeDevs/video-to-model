import { LUMA_URLS } from './luma.constants';
import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { AppConfigService } from 'src/app-config/app-config.service';
import { LoggerService } from 'src/core/logger/logger.service';
import { CreateCapture_ResponseDto } from './dtos/response/create-capture.response.dto';
import { GetCredit_ResponseDto } from './dtos/response/get-credit.response.dto';
import { TriggerCapture_ResponseDto } from './dtos/response/trigger-capture.response.dto';
import { UpdateCapture_RequestDto } from './dtos/request/update-capture.request.dto';
import { UpdateCapture_ResponseDto } from './dtos/response/update-capture.response.dto';
import { GetCapture_ResponseDto } from './dtos/response/get-capture.response';
import { GetCaptures_ResponseDto } from './dtos/response/get-captures.response.dto';
import { SlackUtilsService } from 'src/slack-utils/slack-utils.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENTS } from 'src/events';

@Injectable()
export class LumaAiService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly appConfigService: AppConfigService,
    private readonly eventEmitter: EventEmitter2,
    private readonly slackUtilsService: SlackUtilsService,
  ) {}

  headers(apiKey: string) {
    return {
      Authorization: `luma-api-key=${apiKey}`,
    };
  }

  getCredit = async (apiKey: string): Promise<GetCredit_ResponseDto> => {
    const config: AxiosRequestConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${LUMA_URLS.host}/${LUMA_URLS.capture.base}/${LUMA_URLS.capture.credits}`,
      headers: this.headers(apiKey),
    };

    try {
      const response = await axios(config);
      const creditResponse: GetCredit_ResponseDto = new GetCredit_ResponseDto(
        response.data,
      );
      return creditResponse;
    } catch (error) {
      this.loggerService.error(error);
      throw new Error('Failed to fetch credit data');
    }
  };

  createCapture = async (
    apiKey: string,
    title: string,
  ): Promise<CreateCapture_ResponseDto> => {
    const data = {
      title: title,
    };

    this.eventEmitter.emit(EVENTS.luma.capture.creating, { title });

    const config: AxiosRequestConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${LUMA_URLS.host}/${LUMA_URLS.capture.base}`,
      headers: this.headers(apiKey),
      data: data,
    };

    try {
      const response = await axios(config);
      const captureResponse: CreateCapture_ResponseDto =
        new CreateCapture_ResponseDto(response.data);

      this.eventEmitter.emit(EVENTS.luma.capture.created, {
        data: captureResponse,
      });

      return captureResponse;
    } catch (error) {
      this.loggerService.error(error);
      throw new Error('Failed to create capture');
    }
  };

  upload = async (
    fileAddress: string,
    destinationUrl: string,
  ): Promise<any> => {
    // Regular expression pattern to check for Google Drive shared links
    const googleDrivePattern =
      /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/view/;

    // Check if it's a Google Drive shared link
    const match = fileAddress.match(googleDrivePattern);
    if (match) {
      // If it's a shared link, convert it to a direct download link
      const fileId = match[1];
      fileAddress = `https://drive.google.com/uc?export=download&id=${fileId}`;
    }

    try {
      // Download the file from the provided URL
      const response = await axios.get(fileAddress, {
        responseType: 'arraybuffer',
      });

      // Upload the downloaded file to the destination URL
      const config: AxiosRequestConfig = {
        method: 'put',
        maxBodyLength: Infinity,
        url: destinationUrl,
        headers: {
          'Content-Type': 'application/octet-stream', // Use appropriate content type for your file type
        },
        data: response.data,
      };

      const uploadResponse = await axios(config);
      return uploadResponse.data;
    } catch (error) {
      this.loggerService.error(`File Upload Error`);
      console.log(error);

      throw new Error('Failed to upload data');
    }
  };

  triggerCapture = async (
    apiKey: string,
    slug: string,
  ): Promise<TriggerCapture_ResponseDto> => {
    const config: AxiosRequestConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${LUMA_URLS.host}/${LUMA_URLS.capture.base}/${slug}`,
      headers: this.headers(apiKey),
    };

    try {
      const response = await axios(config);
      const captureResponse: TriggerCapture_ResponseDto = response.data;
      return captureResponse;
    } catch (error) {
      this.loggerService.error(error);
      throw new Error('Failed to trigger capture');
    }
  };

  updateCapture = async (
    apiKey: string,
    slug: string,
    data: UpdateCapture_RequestDto,
  ): Promise<UpdateCapture_ResponseDto> => {
    const config: AxiosRequestConfig = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${LUMA_URLS.host}/${LUMA_URLS.capture.base}/${slug}`,
      headers: this.headers(apiKey),
      data,
    };

    //
    try {
      const response = await axios(config);
      const updateCaptureResponse: UpdateCapture_ResponseDto = response.data;
      return updateCaptureResponse;
    } catch (error) {
      this.loggerService.error(error);
      throw new Error('Failed to update capture');
    }
  };

  getCapture = async (
    apiKey: string,
    slug: string,
  ): Promise<GetCapture_ResponseDto> => {
    const config: AxiosRequestConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${LUMA_URLS.host}/${LUMA_URLS.capture.base}/${slug}`,
      headers: this.headers(apiKey),
    };

    try {
      const response = await axios(config);
      const getCaptureResponse: GetCapture_ResponseDto = response.data;
      return getCaptureResponse;
    } catch (error) {
      this.loggerService.error(error);
      throw new Error('Failed to fetch capture data');
    }
  };

  getCaptures = async (
    apiKey: string,
    option?: {
      pageIndex?: number;
      take?: number;
      order?: 'DESC' | 'ASC';
      search?: string;
    },
  ): Promise<GetCaptures_ResponseDto> => {
    const {
      pageIndex = 0,
      take = 10000,
      order = 'DESC',
      search,
    } = option || {};

    const config: AxiosRequestConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${LUMA_URLS.host}/${LUMA_URLS.capture.base}?${
        search ? `search=${search}&` : ''
      }skip=${pageIndex * take}&take=${take}&order=${order}`,
      headers: this.headers(apiKey),
    };
    //
    try {
      const response = await axios(config);
      const getCapturesResponse: GetCaptures_ResponseDto = response.data;
      return getCapturesResponse;
    } catch (error) {
      this.loggerService.error(error);
      throw new Error('Failed to fetch captures data');
    }
  };
}
