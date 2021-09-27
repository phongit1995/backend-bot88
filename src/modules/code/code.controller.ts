import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CodeService } from './code.service';
import { CreateCodeDto } from './dto/create-code.dto';
@ApiTags('Code Api')
@ApiConsumes('Code Api')
@Controller('code')
export class CodeController {
    constructor(
        private codeService:CodeService
    ){}
    @ApiOperation({ summary: 'create code verify' })
    @Post()
    async create(@Body()createCodeDto:CreateCodeDto){
        return this.codeService.create(createCodeDto);
    }

    @ApiOperation({ summary: ' verify code'  })
    @Post('verify/:code')
    async verify(@Param('code')code:string){
        return this.codeService.verify(code);
    }

}
