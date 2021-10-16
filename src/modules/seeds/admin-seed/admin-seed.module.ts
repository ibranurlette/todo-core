import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from 'src/database/entities/admin/users.entity';
import { AdminSeedController } from './admin-seed.controller';
import { AdminSeedService } from './admin-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser])],
  controllers: [AdminSeedController],
  providers: [AdminSeedService],
  exports: [],
})
export class AdminSeedModule {}
