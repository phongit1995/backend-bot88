import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCodeDto } from './dto/create-code.dto';
import { Code } from './schema/code.schema';

@Injectable()
export class CodeService {
    constructor(
        @InjectModel(Code.name) private readonly codeModel: Model<Code>,
    ){}
    async create(createCodeDto:CreateCodeDto){
        return this.codeModel.create(createCodeDto);
    }

    async verify(id:string){
        let code = await this.codeModel.findOne({code:id});
        if(!code){
            throw new HttpException('Nhập sai báo mã phần mềm ko tồn tại vui lòng liên hệ 0979517777 để nhận mã phần mềm',HttpStatus.BAD_REQUEST);
        }
        if(!code.type){
            throw new HttpException('Cấu hình điện thoại của bạn k phù hợp mã phần mềm này. Vui lòng nhập mã phần mềm khác',HttpStatus.BAD_REQUEST);
        }
        return code ;
    }
}
