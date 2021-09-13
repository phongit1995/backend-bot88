import { Module } from '@nestjs/common';
import { ReferralCodeService } from './referral-code.service';
import { ReferralCodeController } from './referral-code.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReferralCode, ReferralCodeSchema } from './schemas/referral-code.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:ReferralCode.name,schema:ReferralCodeSchema}])
  ],
  providers: [ReferralCodeService],
  controllers: [ReferralCodeController]
})
export class ReferralCodeModule {}
