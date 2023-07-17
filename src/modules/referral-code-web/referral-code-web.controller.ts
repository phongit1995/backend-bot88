import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ReferralCodeWebService } from './referral-code-web.service';
import { CreateCodeDto } from './dto/create-code.dto';
import { ParseObjectIdPipe } from 'src/common/validation.pipe';
@ApiTags('referral-code web api')
@ApiConsumes('referral-code web api')
@ApiBearerAuth()
@Controller('referral-code-web')
export class ReferralCodeWebController {
  constructor(
    private readonly referralCodeWebService: ReferralCodeWebService,
  ) {}
  @Post()
  @ApiOperation({ summary: 'create referral-code web' })
  async create(@Body() createCodeDto: CreateCodeDto) {
    return this.referralCodeWebService.createCoede(createCodeDto);
  }

  @Get()
  @ApiOperation({ summary: 'admin .get list referral-code on web' })
  //   @UseGuards(AdminAuthGuard)
  async getList() {
    return this.referralCodeWebService.list();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'xoá mã giới thiệu' })
  //   @UseGuards(AdminAuthGuard)
  @HttpCode(204)
  async delete(@Param('id', new ParseObjectIdPipe()) id: string) {
    return this.referralCodeWebService.delete(id);
  }

  @ApiOperation({ summary: ' verify code' })
  @Post('verify/:code')
  @HttpCode(200)
  async verify(@Param('code') code: string) {
    return this.referralCodeWebService.veryfi(code);
  }
}
