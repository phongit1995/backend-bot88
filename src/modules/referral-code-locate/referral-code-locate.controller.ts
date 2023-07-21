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
import { ReferralCodeLocateService } from './referral-code-locate.service';
import { CreateCodeDto } from './dto/create-code.dto';
import { ParseObjectIdPipe } from 'src/common/validation.pipe';
@ApiTags('referral-code locate api')
@ApiConsumes('referral-code locate api')
@ApiBearerAuth()
@Controller('referral-code-locate')
export class ReferralCodeLocateController {
  constructor(
    private readonly referralCodeLocateService: ReferralCodeLocateService,
  ) {}
  @Post()
  @ApiOperation({ summary: 'create referral-code locate' })
  async create(@Body() createCodeDto: CreateCodeDto) {
    return this.referralCodeLocateService.createCoede(createCodeDto);
  }

  @Get()
  @ApiOperation({ summary: 'admin .get list referral-code on locate' })
  //   @UseGuards(AdminAuthGuard)
  async getList() {
    return this.referralCodeLocateService.list();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'xoá mã giới thiệu' })
  //   @UseGuards(AdminAuthGuard)
  @HttpCode(204)
  async delete(@Param('id', new ParseObjectIdPipe()) id: string) {
    return this.referralCodeLocateService.delete(id);
  }

  @ApiOperation({ summary: ' verify code' })
  @Post('verify/:code')
  @HttpCode(200)
  async verify(@Param('code') code: string) {
    return this.referralCodeLocateService.veryfi(code);
  }
}
