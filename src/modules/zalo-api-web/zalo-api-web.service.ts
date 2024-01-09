import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ZaloApiWeb } from './schemas/zalo-api-web.schema';
import { Model } from 'mongoose';
import { CreateCodeDto } from './dto/create-code.dto';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { bucketParams, s3 } from 'src/middlewares/multer';
@Injectable()
export class ZaloApiWebService {
  constructor(
    @InjectModel(ZaloApiWeb.name)
    private readonly ZaloApiWebModel: Model<ZaloApiWeb>,
    private readonly i18n: I18nRequestScopeService,
  ) { }

  async createCoede(creatCodeDto: CreateCodeDto, file) {
    const code = await this.ZaloApiWebModel.findOne({
      code: creatCodeDto.code,
    });
    if (code) {
      throw new HttpException(
        await this.i18n.translate('referralCode.REFERRAL_CODE_IS_EXTIS'),
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.ZaloApiWebModel.create({ ...creatCodeDto, avatar: file.location });
  }
  async list() {
    return this.ZaloApiWebModel.find({}).sort({ createdAt: -1 });
  }
  async delete(id: string) {
    // const data = await this.ZaloApiWebModel.findById(id)
    // var startIndex = data.avatar.indexOf("https://mys3dat09.s3.ap-southeast-2.amazonaws.com/") + "https://mys3dat09.s3.ap-southeast-2.amazonaws.com/".length;
    // var desiredPart = data.avatar.substring(startIndex);
    // var decodedString = decodeURIComponent(desiredPart);
    // const deleteFile = await s3.send(new DeleteObjectCommand(bucketParams(decodedString)));
    return this.ZaloApiWebModel.findByIdAndRemove(id);
  }

  async veryfi(id: string) {
    let code = await this.ZaloApiWebModel.findOne({ code: id });
    if (!code) {
      throw new HttpException(
        `Mã phần mềm không tồn tại 
        Vui lòng liên hệ Hotline/Zalo : 0986.62.4444 để nhận mã phần mềm !`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!code.active) {
      throw new HttpException(
        code.message,
        HttpStatus.NOT_FOUND,
      );
    }
    return code;
  }
}
