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
        `Mã phần mềm không tồn tại 
        Vui lòng liên hệ Hotline/Zalo : 0979.51.7777 để nhận mã phần mềm !`,
        HttpStatus.NOT_FOUND,
      );
    }
    if (!code.type) {
      throw new HttpException(
        ` Load dữ liệu không thành công : Cấu hình điện thoại của bạn không phù hợp với mã phần mềm này , Vui lòng nhập mã khác và thử lại .`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!code.actived) {
      throw new HttpException(
        `Load dữ liệu không thành công, Mã chưa kích hoạt Vui lòng liên hệ Hotline/Zalo : 0979.51.7777 để kích hoạt !`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return code;
  }

  async list() {
    return this.codeModel.find().sort({ createdAt: 1 });
  }
  async delete(id: string) {
    await this.codeModel.findByIdAndDelete(id);
  }
  async listCodeActive() {
    return this.codeModel
      .find({
        actived: true,
        type: true,
      })
      .sort({ createAt: 1 });
  }
}
