/*external modules*/
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/*modules*/
import { AuthModule } from '../auth/auth.module';
/*services*/
import { MessageService } from './message.service';
/*controllers*/
import { MessageController } from './message.controller';
/*@entities*/
import { MessageEntity } from '@entities/message';

@Module({
  imports: [
    // method to define which repositories are registered in the current scope
    // after using the @InjectRepository() for inject the UsersRepository
    TypeOrmModule.forFeature([MessageEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [TypeOrmModule],
})
export class MessageModule {}
