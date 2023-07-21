import { Module } from '@nestjs/common';
import { ReferralCodeLocateService } from './referral-code-locate.service';
import { ReferralCodeLocateController } from './referral-code-locate.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReferralCodeLocate, ReferralCodeLocateSchema } from './schemas/referral-code-locate.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:ReferralCodeLocate.name,schema:ReferralCodeLocateSchema}])
  ],
  providers: [ReferralCodeLocateService],
  controllers: [ReferralCodeLocateController]
})
export class ReferralCodeLocateModule {}
