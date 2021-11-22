import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCodeDto } from './dto/create-code.dto';
import { Code } from './schema/code.schema';

@Injectable()
export class CodeService {
  constructor(
    @InjectModel(Code.name) private readonly codeModel: Model<Code>,
  ) {}
  async create(createCodeDto: CreateCodeDto) {
    return this.codeModel.create(createCodeDto);
  }

  async verify(id: string) {
    let code = await this.codeModel.findOne({ code: id });
    if (!code) {
      throw new HttpException(
        `Mã phần mềm không tồn tại. Vui lòng liên hệ Mr. Tiến để nhận mã phần mềm !`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!code.type) {
      throw new HttpException(
        `Lỗi !!!! Điện thoại của bạn không phù hợp mã phần mềm này. Vui lòng nhập mã phần mềm khác`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!code.actived) {
      throw new HttpException(
        `Mã phần mềm chưa kích hoạt! Liên Hệ Mr. Tiến Để kích hoạt !`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return code;
  }

  async list() {
    return this.codeModel.find().sort({ createdAt: -1 });
  }
  async delete(id: string) {
    await this.codeModel.findByIdAndDelete(id);
  }
}
