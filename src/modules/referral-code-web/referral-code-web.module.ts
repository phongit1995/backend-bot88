import { Module } from '@nestjs/common';
import { ReferralCodeWebService } from './referral-code-web.service';
import { ReferralCodeWebController } from './referral-code-web.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReferralCodeWeb, ReferralCodeWebSchema } from './schemas/referral-code-web.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:ReferralCodeWeb.name,schema:ReferralCodeWebSchema}])
  ],
  providers: [ReferralCodeWebService],
  controllers: [ReferralCodeWebController]
})
export class ReferralCodeWebModule {}
