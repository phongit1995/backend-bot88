import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUnlockIcloudDto } from './dto/create-unlock-icloud.dto';
import { UnlockIcloudService } from './unlock-icloud.service';
import { ParseObjectIdPipe } from 'src/common/validation.pipe';
import { VerifyUnlockIcloudDto } from './dto/verify-code-unlock-icloud.dto';
@ApiTags('unlock-icloud')
@ApiConsumes('unlock-icloud')
@Controller('unlock-icloud')
export class UnlockIcloudController {
    constructor(private unlockIcloudService:UnlockIcloudService){}
    @Post('/create')
    @ApiOperation({ summary: 'create unlock icloud' })
    async create(@Body()body:CreateUnlockIcloudDto) {
        return this.unlockIcloudService.create(body);
    }

    @Get()
    @ApiOperation({ summary: 'admin .get list unlock icloud' })
    async getList() {
        return this.unlockIcloudService.getList();
    }

    @Delete(':id')
    @ApiOperation({ summary: 'xoá mã unlock icloud' })
    @HttpCode(204)
    async delete(@Param('id', new ParseObjectIdPipe()) id: string) {
        return this.unlockIcloudService.deleteCode(id);
    }

    @Post('/verify')
    @ApiOperation({ summary: ' verify code' })
    async verify(@Body() body: VerifyUnlockIcloudDto) {
        return this.unlockIcloudService.verify(body);
    }
}
