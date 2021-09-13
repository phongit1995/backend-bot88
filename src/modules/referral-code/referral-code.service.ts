import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { createPagination } from 'src/common/text.helper';
import { CreateReferralCodeDto } from './dto/create-referral-code.dto';
import { ListReferralCodeDto } from './dto/list-referral-code.dto';
import { ReferralCode } from './schemas/referral-code.schema';

@Injectable()
export class ReferralCodeService {
  constructor(
    @InjectModel(ReferralCode.name)
    private readonly referralCodeModel: Model<ReferralCode>,
    private readonly i18n: I18nRequestScopeService,
  ) {}

  async create(createReferralCodeDto: CreateReferralCodeDto) {
    let code = await this.referralCodeModel.findOne({
      referralCode: createReferralCodeDto.referralCode.toUpperCase(),
    });
    if (code) {
      throw new HttpException(
        await this.i18n.translate('referralCode.REFERRAL_CODE_IS_EXTIS'),
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.referralCodeModel.create({
      ...createReferralCodeDto,
      referralCode: createReferralCodeDto.referralCode.toUpperCase(),
    });
  }
  async delete(id: string) {
    return this.referralCodeModel.findByIdAndRemove(id);
  }

  async list(listReferralCodeDto: ListReferralCodeDto) {
    let [data, count] = await Promise.all([
      this.referralCodeModel
        .find({})
        .sort({ createdAt: -1 })
        .skip((listReferralCodeDto.page - 1) * listReferralCodeDto.pageSize)
        .limit(listReferralCodeDto.pageSize),
      this.referralCodeModel.countDocuments(),
    ]);
    return createPagination(
      data,
      count,
      listReferralCodeDto.page,
      listReferralCodeDto.pageSize,
    );
  }
}
