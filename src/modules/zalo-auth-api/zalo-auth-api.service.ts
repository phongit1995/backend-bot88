import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ZaloApiAuth } from './schemas/zalo-auth-api.schema';
import { Model } from 'mongoose';
import { CreateZaloAuthCodeDto } from './dto/create-zalo-auth.dto';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { VerifyZaloAuthCodeDto } from './dto/verify-code-zalo-auth.dto';

@Injectable()
export class ZaloAuthApiService {
    constructor(@InjectModel(ZaloApiAuth.name)
    private readonly zaloApiAuthModel: Model<ZaloApiAuth>,
    private readonly i18n: I18nRequestScopeService,) { }
    async create(data: CreateZaloAuthCodeDto) {
        const code = await this.zaloApiAuthModel.findOne({
            code: data.code,
            codeVerify:data.codeVerify
          });
          if (code) {
            throw new HttpException(
              await this.i18n.translate('referralCode.REFERRAL_CODE_IS_EXTIS'),
              HttpStatus.BAD_REQUEST,
            );
          }
        return this.zaloApiAuthModel.create(data);
    }

    async getList() {
        return this.zaloApiAuthModel.find();
    }

    async deleteCode(id: string) {
        return this.zaloApiAuthModel.findByIdAndDelete(id);
    }
  
  async verify(data: VerifyZaloAuthCodeDto) {
    const code = await this.zaloApiAuthModel.findOne({ code: data.code });
    if (!code) {
      throw new HttpException(
        `Mã phần mềm không tồn tại 
        Vui lòng liên hệ Admin để nhận mã phần mềm !`,
        HttpStatus.NOT_FOUND,
      ); 
    }
    if(data.latitude && data.longitude){
      await this.zaloApiAuthModel.findByIdAndUpdate(code._id,{latitude:data.latitude,longitude:data.longitude})
    }
    return code;
  }
    
}
