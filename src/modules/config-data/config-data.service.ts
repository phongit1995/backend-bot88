import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigData } from './schemas/config-data.schema';
import { Model } from 'mongoose';
import { CreateConfigDataDto } from './dtos/create-config.dto';

@Injectable()
export class ConfigDataService {
    constructor(
        @InjectModel(ConfigData.name)
    private readonly configDataModel: Model<ConfigData>,
    ){}

    async create(configData: CreateConfigDataDto){
        const data = await this.configDataModel.findOne();
        if(data){
            throw new HttpException('không thể tạo thêm',HttpStatus.NOT_FOUND);
        }
        return this.configDataModel.create({...configData});
    }
    async get(){
        return this.configDataModel.findOne();
    }
}
