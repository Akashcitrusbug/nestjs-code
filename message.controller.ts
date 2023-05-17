/*external modules*/
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
} from '@nestjs/swagger';
/*services*/
import { MessageService } from './message.service';
/*@common*/
import { JwtAuthGuard } from '@common/guards';
/*@entities*/
import { MessageThoughtModel } from '@entities/message';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/save-user-message')
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Save user messages.' })
  @ApiCreatedResponse({
    status: 201,
    description: 'Save user messages.',
    type: MessageThoughtModel,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  saveMessages(@Body() messageDetails: any) {
    return this.messageService.saveMessages(messageDetails);
  }

  @Get('/fetch-messages-by-user/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Fetch messages by user id.' })
  @ApiCreatedResponse({
    status: 200,
    description: 'Fetch message by user id.',
    type: MessageThoughtModel,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  fetchMessagesByUserId(@Param('id') id: ParseUUIDPipe) {
    return this.messageService.fetchMessagesByUserId(id);
  }

  @Get('/fetch-message-detail/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Fetch messages by message id.' })
  @ApiCreatedResponse({
    status: 200,
    description: 'Fetch message by message id.',
    type: MessageThoughtModel,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  fetchMessagesByMessageId(@Param('id') id: ParseUUIDPipe) {
    return this.messageService.fetchMessagesByMessageId(id);
  }

  @Get('/fetch-graph-data')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Fetch daily messages.' })
  @ApiCreatedResponse({
    status: 200,
    description: 'Fetch daily messages.',
    type: MessageThoughtModel,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  fetchGraphData(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.messageService.fetchGraphData(new Date(startDate), new Date(endDate));
  }
}
