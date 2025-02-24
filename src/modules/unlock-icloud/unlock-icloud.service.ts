import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UnlockIcloud } from './schemas/unlock-icloud.schema';
import { Model } from 'mongoose';
import { CreateUnlockIcloudDto } from './dto/create-unlock-icloud.dto';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { VerifyUnlockIcloudDto } from './dto/verify-code-unlock-icloud.dto';

@Injectable()
export class UnlockIcloudService {
    constructor(@InjectModel(UnlockIcloud.name)
    private readonly unlockIcloudModel: Model<UnlockIcloud>,
    private readonly i18n: I18nRequestScopeService,) { }
    async create(data: CreateUnlockIcloudDto) {
        const code = await this.unlockIcloudModel.findOne({
            code: data.code,
            codeVerify:data.codeVerify
          });
          if (code) {
            throw new HttpException(
              await this.i18n.translate('referralCode.REFERRAL_CODE_IS_EXTIS'),
              HttpStatus.BAD_REQUEST,
            );
          }
        return this.unlockIcloudModel.create(data);
    }

    async getList() {
        return this.unlockIcloudModel.find();
    }

    async deleteCode(id: string) {
        return this.unlockIcloudModel.findByIdAndDelete(id);
    }
  
  async verify(data: VerifyUnlockIcloudDto) {
    const code = await this.unlockIcloudModel.findOne({ code: data.code });
    if (!code) {
      throw new HttpException(
        `Mã phần mềm không tồn tại 
        Vui lòng liên hệ Admin để nhận mã phần mềm !`,
        HttpStatus.NOT_FOUND,
      ); 
    }
    if(data.latitude && data.longitude){
      await this.unlockIcloudModel.findByIdAndUpdate(code._id,{latitude:data.latitude,longitude:data.longitude})
    }
    return code;
  }
    
}
