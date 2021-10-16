import { Controller, Get, Res } from '@nestjs/common'
import { Response } from 'express'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

import { AdminSeedService } from './admin-seed.service'

@ApiTags('Seeds Admin')
@Controller(`seeds/admin`)
export class AdminSeedController {
  constructor(private readonly adminSeedService: AdminSeedService) {}

  @ApiOperation({ summary: 'Seed Main User' })
  @Get('main-user')
  async seedMainUser() {
    return await this.adminSeedService.seedMainUser()
  }
}
