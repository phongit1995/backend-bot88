import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateZaloAuthCodeDto } from './dto/create-zalo-auth.dto';
import { ZaloAuthApiService } from './zalo-auth-api.service';
import { ParseObjectIdPipe } from 'src/common/validation.pipe';
import { VerifyZaloAuthCodeDto } from './dto/verify-code-zalo-auth.dto';
@ApiTags('zalo-api-auth')
@ApiConsumes('zalo-api-auth')

@Controller('zalo-auth-api')
export class ZaloAuthApiController {
    constructor(private zaloAuthApiService:ZaloAuthApiService){}
    @Post('/create')
    @ApiOperation({ summary: 'create zalo-auth-api' })
    async create(@Body()body:CreateZaloAuthCodeDto) {
        return this.zaloAuthApiService.create(body);
    }

    @Get()
    @ApiOperation({ summary: 'admin .get list zalo api auth on web' })
    async getList() {
        return this.zaloAuthApiService.getList();
    }

    @Delete(':id')
    @ApiOperation({ summary: 'xoá mã zalo api' })
    @HttpCode(204)
    async delete(@Param('id', new ParseObjectIdPipe()) id: string) {
        return this.zaloAuthApiService.deleteCode(id);
    }

    @Post('/verify')
    @ApiOperation({ summary: ' verify code' })
    async verify(@Body() body: VerifyZaloAuthCodeDto) {
        return this.zaloAuthApiService.verify(body);
    }
}
