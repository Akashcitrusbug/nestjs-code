/*external modules*/
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
} from '@nestjs/swagger';
/*services*/
import { ChatGPTService } from './chatGPT.service';
/*dto*/
import { ChatGPTDto } from './dto/chatGPT.dto';
/*@common*/
import { JwtAuthGuard } from '../../common/guards';
/*@entities*/

@Controller('check-message')
export class ChatGPTController {
  constructor(private readonly chatGPTService: ChatGPTService) {}

  @Post('/tone')
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Check the tone of user message.' })
  @ApiCreatedResponse({
    status: 201,
    description: 'Check the tone of user message.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async checkMessageTone(@Body() data: ChatGPTDto) {
    return this.chatGPTService.checkMessageTone(data.message);
  }
}
