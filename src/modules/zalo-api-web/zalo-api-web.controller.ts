import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ZaloApiWebService } from './zalo-api-web.service';
import { CreateCodeDto } from './dto/create-code.dto';
import { ParseObjectIdPipe } from 'src/common/validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerS3Options } from 'src/middlewares/multer';
@ApiTags('zalo-api-web')
@ApiConsumes('zalo-api-web')
@ApiBearerAuth()
@Controller('zalo-api-web')
export class ZaloApiWebController {
  constructor(
    private readonly referralCodeWebService: ZaloApiWebService,
  ) { }

  @Post('/create')
  @UseInterceptors(FileInterceptor('avatar', multerS3Options))
  @ApiOperation({ summary: 'create zalo-api-web' })
  async create(@Body() createCodeDto: CreateCodeDto, @UploadedFile() file) {
    return this.referralCodeWebService.createCoede(createCodeDto, file);
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
