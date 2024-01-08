import { Module } from '@nestjs/common';
import { ZaloApiWebService } from './zalo-api-web.service';
import { ZaloApiWebController } from './zalo-api-web.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ZaloApiWeb, ZaloApiWebSchema } from './schemas/zalo-api-web.schema';
import { MulterModule } from '@nestjs/platform-express';
import { multerS3Options } from 'src/middlewares/multer';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ZaloApiWeb.name, schema: ZaloApiWebSchema }]),
    MulterModule.register(multerS3Options),
  ],
  providers: [ZaloApiWebService],
  controllers: [ZaloApiWebController]
})
export class ZaloApiWebModule { }
