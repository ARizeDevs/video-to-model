import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Block, KnownBlock, WebClient } from '@slack/web-api';
import { AppConfigService } from 'src/app-config/app-config.service';
// import axios from 'axios';

@Injectable()
export class SlackUtilsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly appConfigService: AppConfigService,
  ) {}

  async sendMessage(
    {
      text,
      blocks,
    }: {
      text?: string;
      blocks?: KnownBlock[];
    },
    channel: string,
  ) {
    try {
      const token = this.appConfigService.slack.accessToken;
      const web = new WebClient(token);
      // Use the `chat.postMessage` method to send a message from this app
      await web.chat.postMessage({
        channel: `#${channel}`,
        text: `${text}`,
        blocks,
      });
    } catch (error) {
      console.log('Error posting message:', error);
    }
  }

  async sendMessageDefaultChannel(obj: {
    text?: string;
    blocks?: KnownBlock[];
  }) {
    await this.sendMessage(obj, this.appConfigService.slack.defaultChannel);
  }
}
