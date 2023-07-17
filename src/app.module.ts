import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { ReferralCodeModule } from './modules/referral-code/referral-code.module';
import { NotificationModule } from './modules/notification/notification.module';
import { CodeModule } from './modules/code/code.module';
import { SocketModule } from './modules/socket/socket.module';
import { GameModule } from './modules/game/game.module';
import { ReferralCodeWebModule } from './modules/referral-code-web/referral-code-web.module';
@Module({
  imports: [
    SharedModule,
    SocketModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URL'),
        retryAttempts: 3,
      }),
    }),
    AuthModule,
    ReferralCodeModule,
    NotificationModule,
    CodeModule,
    GameModule,
    ReferralCodeWebModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
