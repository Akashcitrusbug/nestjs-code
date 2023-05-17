/*external modules*/
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
/*services*/
/*@entities*/
import { MessageEntity, MessageThoughtModel } from '@entities/message';
import moment from 'moment';
/*@interfaces*/

@Injectable()
export class MessageService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
  ) { }

  async saveMessages(message: MessageThoughtModel): Promise<MessageThoughtModel> {
    await this.messageRepository.save(message);
    return message;
  }

  async fetchMessagesByUserId(id: any): Promise<any> {
    const message = await this.messageRepository.find({
      where: {
        user: id,
      },
      order: { createdAt: 'DESC' },
    });
    return message;
  }

  async fetchMessagesByMessageId(id: any): Promise<any> {
    const message = await this.messageRepository.findOne({ id });
    return message;
  }

  async fetchGraphData(startDate: any, endDate: any): Promise<any> {
    const messages = await this.messageRepository.find({
      where: {
        createdAt: Between(
          new Date(startDate.setHours(0, 0, 0, 0)),
          new Date(endDate.setHours(23, 59, 59, 999)),
        ),
      },
      order: {
        createdAt: 'ASC',
      },
    });

    const updatedMessages = messages.map((message) => {
      const month = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const prefixes = ['0', '1', '2', '3', '4', '5'];
      const createdAtWithoutTime = message.createdAt.toISOString().substr(0, 10);
      const createdWeek =
        parseInt(prefixes[0 | ((message.createdAt.getDate() + message.createdAt.getDay()) / 7)]) +
        1;
      const createdMonth = month[message.createdAt.getMonth()];
      const cretaedAtWithFormated = `${message.mood} - ${moment(message.createdAt).format('MM-DD-YYYY HH:MM')}`

      return { ...message, createdAtWithoutTime, createdWeek, createdMonth, cretaedAtWithFormated };
    });

    return updatedMessages;
  }
}
