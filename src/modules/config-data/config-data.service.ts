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
            data.zaloPhone = configData.zaloPhone;
            return data.save()
        }
        return this.configDataModel.create({...configData});
    }
    async get(){
        return this.configDataModel.findOne();
    }
}
