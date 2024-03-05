import { Module } from '@nestjs/common';
import { ZaloAuthApiController } from './zalo-auth-api.controller';
import { ZaloAuthApiService } from './zalo-auth-api.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ZaloApiAuthSchema ,ZaloApiAuth} from './schemas/zalo-auth-api.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: ZaloApiAuth.name, schema: ZaloApiAuthSchema }]),],
  controllers: [ZaloAuthApiController],
  providers: [ZaloAuthApiService]
})
export class ZaloAuthApiModule {}
