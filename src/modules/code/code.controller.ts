import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ParseObjectIdPipe } from 'src/common/validation.pipe';
import { CodeService } from './code.service';
import { CreateCodeDto } from './dto/create-code.dto';
@ApiTags('Code Api')
@ApiConsumes('Code Api')
@Controller('code')
export class CodeController {
  constructor(private codeService: CodeService) {}
  @ApiOperation({ summary: 'create code verify' })
  @Post()
  async create(@Body() createCodeDto: CreateCodeDto) {
    return this.codeService.create(createCodeDto);
  }

  @Get('/active')
  @ApiOperation({ summary: 'get list code active' })
  async listCodeActive() {
    return this.codeService.listCodeActive();
  }

  @ApiOperation({ summary: 'get list code' })
  @Get()
  async list() {
    return this.codeService.list();
  }

  @ApiOperation({ summary: ' verify code' })
  @Post('verify/:code')
  @HttpCode(200)
  async verify(@Param('code') code: string) {
    return this.codeService.verify(code);
  }

  @ApiOperation({ summary: 'delete verify code' })
  @Delete(':id')
  async delete(@Param('id', new ParseObjectIdPipe()) id: string) {
    return this.codeService.delete(id);
  }
}
