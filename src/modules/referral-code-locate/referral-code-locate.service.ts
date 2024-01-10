import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReferralCodeLocate } from './schemas/referral-code-locate.schema';
import { Model } from 'mongoose';
import { CreateCodeDto } from './dto/create-code.dto';
import { I18nRequestScopeService } from 'nestjs-i18n';

@Injectable()
export class ReferralCodeLocateService {
  constructor(
    @InjectModel(ReferralCodeLocate.name)
    private readonly referralCodeModelLocate: Model<ReferralCodeLocate>,
    private readonly i18n: I18nRequestScopeService,
  ) {}

  async createCoede(creatCodeDto: CreateCodeDto) {
    const code = await this.referralCodeModelLocate.findOne({
      code: creatCodeDto.code,
    });
    if (code) {
      throw new HttpException(
        await this.i18n.translate('referralCode.REFERRAL_CODE_IS_EXTIS'),
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.referralCodeModelLocate.create({ ...creatCodeDto });
  }
  async list() {
    return this.referralCodeModelLocate.find({}).sort({ createdAt: -1 });
  }

  async delete(id: string) {
    return this.referralCodeModelLocate.findByIdAndRemove(id);
  }

  async veryfi(id:string){
    let code = await this.referralCodeModelLocate.findOne({ code: id });
    if (!code) {
      throw new HttpException(
        `Mã phần mềm không tồn tại 
        Vui lòng liên hệ Hotline/Zalo : 0979.51.7777 để nhận mã phần mềm !`,
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
