import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConfigDataService } from './config-data.service';
import { CreateConfigDataDto } from './dtos/create-config.dto';

@ApiTags('config-data')
@Controller('config-data')
export class ConfigDataController {
    constructor(private configDataService:ConfigDataService){}
    @Post('create')
    @ApiOperation({ summary: 'get config' })
    async create(@Body()data: CreateConfigDataDto){
        return this.configDataService.create(data);
    }

    @Get()
    @ApiOperation({ summary: 'create config' })
    async getValue(){
        return this.configDataService.get();
    }

}
