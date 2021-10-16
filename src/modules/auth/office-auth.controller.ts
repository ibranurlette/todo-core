import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TodoAuthGuard } from 'src/commons/guards/todo-auth.guard';
import { User } from 'src/commons/decorators/user.decorator';

import { OfficeAuthService } from './office-auth.service';

import { OfficeAuthLoginDto } from './dto/office-auth-login.dto';

@ApiTags('Auth')
@Controller(`office`)
export class OfficeAuthController {
  constructor(private readonly officeAuthService: OfficeAuthService) {}

  @ApiOperation({ summary: 'Login' })
  @Post('login')
  async login(@Body() loginDto: OfficeAuthLoginDto) {
    return await this.officeAuthService.login(loginDto);
  }

  @ApiOperation({ summary: 'Profile' })
  @ApiBearerAuth()
  @UseGuards(TodoAuthGuard)
  @Get('profile')
  async getProfile(@User('user_id') user_id: string) {
    return await this.officeAuthService.getProfile(user_id);
  }
}
