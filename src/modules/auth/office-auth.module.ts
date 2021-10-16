import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeAuthController } from './office-auth.controller';
import { OfficeAuthService } from './office-auth.service';
import { OfficeTokenService } from './token/office-token.service';
import { AdminRefreshTokenRepository } from 'src/commons/repositories/admin/refresh-token.repository';
import { AdminUser } from 'src/database/entities/admin/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser, AdminRefreshTokenRepository])],
  controllers: [OfficeAuthController],
  providers: [OfficeAuthService, OfficeTokenService],
  exports: [OfficeAuthService],
})
export class OfficeAuthModule {}
