import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/common/auth.guard';
import { ParseObjectIdPipe } from 'src/common/validation.pipe';
import { CreateReferralCodeDto } from './dto/create-referral-code.dto';
import {
  ListReferralCodeDto,
  ResGetListNewsDto,
} from './dto/list-referral-code.dto';
import { ReferralCodeService } from './referral-code.service';

@ApiTags('referral-code api')
@ApiConsumes('referral-code api')
@ApiBearerAuth()
@Controller('referral-code')
export class ReferralCodeController {
  constructor(private readonly referralCodeService: ReferralCodeService) {}
  @Post()
  @ApiOperation({ summary: 'create referral-code' })
  async create(@Body() createReferralCodeDto: CreateReferralCodeDto) {
    return this.referralCodeService.create(createReferralCodeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'xoá mã giới thiệu' })
  @UseGuards(AdminAuthGuard)
  @HttpCode(204)
  async delete(@Param('id', new ParseObjectIdPipe()) id: string) {
    return this.referralCodeService.delete(id);
  }

  @Get()
  @ApiOperation({ summary: 'admin .get list referral-code' })
  @UseGuards(AdminAuthGuard)
  @ApiOkResponse({ type: ResGetListNewsDto, status: 200 })
  async getList(@Query() listReferralCodeDto: ListReferralCodeDto) {
    return this.referralCodeService.list(listReferralCodeDto);
  }
}
