import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReferralCodeWeb } from './schemas/referral-code-web.schema';
import { Model } from 'mongoose';
import { CreateCodeDto } from './dto/create-code.dto';
import { I18nRequestScopeService } from 'nestjs-i18n';

@Injectable()
export class ReferralCodeWebService {
  constructor(
    @InjectModel(ReferralCodeWeb.name)
    private readonly referralCodeModelWeb: Model<ReferralCodeWeb>,
    private readonly i18n: I18nRequestScopeService,
  ) {}

  async createCoede(creatCodeDto: CreateCodeDto) {
    const code = await this.referralCodeModelWeb.findOne({
      code: creatCodeDto.code,
    });
    if (code) {
      throw new HttpException(
        await this.i18n.translate('referralCode.REFERRAL_CODE_IS_EXTIS'),
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.referralCodeModelWeb.create({ ...creatCodeDto });
  }
  async list() {
    return this.referralCodeModelWeb.find({}).sort({ createdAt: -1 });
  }

  async delete(id: string) {
    return this.referralCodeModelWeb.findByIdAndRemove(id);
  }

  async veryfi(id:string){
    let code = await this.referralCodeModelWeb.findOne({ code: id });
    if (!code) {
      throw new HttpException(
        `Mã phần mềm không tồn tại 
        Vui lòng liên hệ Admin để nhận mã phần mềm !`,
        HttpStatus.NOT_FOUND,
      );
    }

    if(!code.active){
      throw new HttpException(
        code.message,
        HttpStatus.NOT_FOUND,
      );
    }
    return code;
  }
}
