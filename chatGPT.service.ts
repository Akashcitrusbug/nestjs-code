/*external modules*/
import _ from 'lodash';
import axios from 'axios';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ChatGPTService {
  private readonly logger = new Logger(this.constructor.name);

  async checkMessageTone(message: string): Promise<any> {
    const url = `${process.env.CHAT_GPT_BASE_URL}/completions`;
    const data = {
      model: process.env.CHAT_GPT_MODEL,
      prompt: message,
      max_tokens: 500,
    };
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.CHAT_GPT_API_KEY}`,
    };
    const response = await axios.post(url, data, { headers });
    return response.data;
  }
}
