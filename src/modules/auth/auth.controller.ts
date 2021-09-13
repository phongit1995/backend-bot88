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
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/common/auth.guard';
import { ParseObjectIdPipe } from 'src/common/validation.pipe';
import { AuthService } from './auth.service';
import { ListUserDto, ResListUserDto } from './dto/list-user.dto';
import { LoginUserDto, ResLoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
@ApiTags('Auth Api')
@ApiConsumes('Auth Api')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register user' })
  @Post('register')
  @HttpCode(200)
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
  }

  @ApiOperation({ summary: 'Đăng Nhập User' })
  @Post('login')
  @ApiOkResponse({ status: 200, type: ResLoginUserDto })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Admin .Danh Sách User' })
  @ApiOkResponse({ type: ResListUserDto, status: 200 })
  @UseGuards(AdminAuthGuard)
  async listUser(@Query() listUserDto: ListUserDto) {
    return this.authService.listUser(listUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Admin .Xoá Người Dung' })
  @UseGuards(AdminAuthGuard)
  async deleteUser(@Param('id', new ParseObjectIdPipe()) id: string) {
    return this.authService.delete(id);
  }
}
