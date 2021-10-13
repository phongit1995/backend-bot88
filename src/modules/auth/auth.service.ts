import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { createPagination } from 'src/common/text.helper';
import { ReferralCode } from '../referral-code/schemas/referral-code.schema';
import { User } from '../users/schemas/user.schema';
import { EUserRole, EUserType } from '../users/user.constant';
import { ListUserDto } from './dto/list-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(ReferralCode.name)
    private readonly referralCodeModel: Model<ReferralCode>,
    private readonly i18n: I18nRequestScopeService,
    private readonly jwtService: JwtService,
  ) {}
  async registerUser(registerUserDto: RegisterUserDto) {
    let referral = await this.referralCodeModel.findOne({
      referralCode: registerUserDto.referralCode.toUpperCase(),
    });
    if (!referral) {
      throw new HttpException(
        await this.i18n.translate('referralCode.REFERRAL_CODE_NOT_FOUND'),
        HttpStatus.BAD_REQUEST,
      );
    }
    let userCheck = await this.userModel.findOne({
      phone: registerUserDto.phone,
    });
    if (userCheck) {
      throw new HttpException(
        await this.i18n.translate('user.PHONE_IS_EXITS'),
        HttpStatus.BAD_REQUEST,
      );
    }
    delete registerUserDto.referralCode;
    return this.userModel.create({
      ...registerUserDto,
      type: EUserType.TAIXIU,
    });
  }

  async login(loginUserDto: LoginUserDto) {
    let user = await this.userModel
      .findOne({
        phone: loginUserDto.phone,
      })
      .select('-token');
    if (!user) {
      throw new HttpException(
        await this.i18n.translate('user.USER_NOT_FOUND'),
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user.password != loginUserDto.password.trim()) {
      throw new HttpException(
        await this.i18n.translate('user.USER_NOT_FOUND'),
        HttpStatus.BAD_REQUEST,
      );
    }
    let userData = user.toObject();
    delete userData.password;
    let token = await this.jwtService.signAsync(
      { ...userData },
      { expiresIn: '365d' },
    );
    return {
      ...userData,
      token,
    };
  }
  async listUser(listUserDto: ListUserDto) {
    let [data, count] = await Promise.all([
      this.userModel
        .find({ role: EUserRole.USER })
        .sort({ createdAt: -1 })
        .select('-password -token'),
      this.userModel.countDocuments({ role: EUserRole.USER }),
    ]);
    return createPagination(
      data,
      count,
      listUserDto.page,
      listUserDto.pageSize,
    );
  }
  async delete(id: string) {
    return this.userModel.findByIdAndRemove(id);
  }

  async adminChangePasswordUser(id: string, password: string) {
    let user = await this.userModel.findByIdAndUpdate(id, {
      password: password,
    });
    if (!user) {
      throw new HttpException(
        await this.i18n.translate('user.USER_NOT_FOUND'),
        HttpStatus.BAD_REQUEST,
      );
    }
    return;
  }
  async addtokenNotification(id: string, token: string) {
    let user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException(
        await this.i18n.translate('user.USER_NOT_FOUND'),
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.userModel.findByIdAndUpdate(id, {
      $addToSet: { token },
    });
  }
  async remoteTokenNotification(id: string, token: string) {
    let user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException(
        await this.i18n.translate('user.USER_NOT_FOUND'),
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.userModel.findByIdAndUpdate(id, {
      $pull: { token },
    });
  }
}
