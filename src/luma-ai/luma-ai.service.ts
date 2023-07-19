import { LUMA_URLS } from './luma.constants';
import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { AppConfigService } from 'src/app-config/app-config.service';
import { LoggerService } from 'src/core/logger/logger.service';
import qs from 'qs';
import { CreateCapture_ResponseDto } from './dtos/response/create-capture.response.dto';
import { GetCredit_ResponseDto } from './dtos/response/get-credit.response.dto';
import { TriggerCapture_ResponseDto } from './dtos/response/trigger-capture.response.dto';
import { UpdateCapture_RequestDto } from './dtos/request/update-capture.request.dto';
import { UpdateCapture_ResponseDto } from './dtos/response/update-capture.response.dto';
import { GetCapture_ResponseDto } from './dtos/response/get-capture.response';
import { GetCaptures_ResponseDto } from './dtos/response/get-captures.response.dto';

@Injectable()
export class LumaAiService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly appConfigService: AppConfigService,
  ) {}

  get headers() {
    return {
      Authorization: `luma-api-key=${this.appConfigService.luma.apiKey}`,
    };
  }

  getCredit = async (): Promise<GetCredit_ResponseDto> => {
    const config: AxiosRequestConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${LUMA_URLS.host}/${LUMA_URLS.capture.base}/${LUMA_URLS.capture.credits}`,
      headers: this.headers,
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

  createCapture = async (title: string): Promise<CreateCapture_ResponseDto> => {
    const data = qs.stringify({
      title: title,
    });

    const config: AxiosRequestConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${LUMA_URLS.host}/${LUMA_URLS.capture.base}`,
      headers: this.headers,
      data: data,
    };

    try {
      const response = await axios(config);
      const captureResponse: CreateCapture_ResponseDto = response.data;
      return captureResponse;
    } catch (error) {
      this.loggerService.error(error);
      throw new Error('Failed to create capture');
    }
  };

  upload = async (data: any[], url: string): Promise<any> => {
    const config: AxiosRequestConfig = {
      method: 'put',
      maxBodyLength: Infinity,
      url: url,
      headers: {
        'Content-Type': 'text/plain',
      },
      data: data,
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to upload data');
    }
  };

  triggerCapture = async (
    slug: string,
  ): Promise<TriggerCapture_ResponseDto> => {
    const config: AxiosRequestConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${LUMA_URLS.host}/${LUMA_URLS.capture.base}/${slug}`,
      headers: this.headers,
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
    slug: string,
    data: UpdateCapture_RequestDto,
  ): Promise<UpdateCapture_ResponseDto> => {
    const config: AxiosRequestConfig = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${LUMA_URLS.host}/${LUMA_URLS.capture.base}/${slug}`,
      headers: this.headers,
      data: JSON.stringify(data),
    };

    try {
      const response = await axios(config);
      const updateCaptureResponse: UpdateCapture_ResponseDto = response.data;
      return updateCaptureResponse;
    } catch (error) {
      this.loggerService.error(error);
      throw new Error('Failed to update capture');
    }
  };

  getCapture = async (slug: string): Promise<GetCapture_ResponseDto> => {
    const config: AxiosRequestConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${LUMA_URLS.host}/${LUMA_URLS.capture.base}/${slug}`,
      headers: this.headers,
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

  getCaptures = async (option?: {
    pageIndex?: number;
    take?: number;
    order?: 'DESC' | 'ASC';
    search?: string;
  }): Promise<GetCaptures_ResponseDto> => {
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
      headers: this.headers,
    };

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
