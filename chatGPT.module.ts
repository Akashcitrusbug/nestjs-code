/*external modules*/
import { forwardRef, Module } from '@nestjs/common';

/*services*/
import { ChatGPTService } from './chatGPT.service';
/*controllers*/
import { ChatGPTController } from './chatGPT.controller';

@Module({
  controllers: [ChatGPTController],
  providers: [ChatGPTService],
})
export class ChatGPTModule {}
