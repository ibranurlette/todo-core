import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import moment from 'moment';

import { mainAdminUserData } from './data/main-user.data';
import { AdminUser } from 'src/database/entities/admin/users.entity';
import { MyBcrypt } from 'src/utils/myBcrypt';

@Injectable()
export class AdminSeedService {
  constructor(
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: Repository<AdminUser>,
  ) {}

  async seedMainUser() {
    for (let i = 0; i < mainAdminUserData.length; i++) {
      const item = mainAdminUserData[i];
      const check = await this.adminUserRepository.findOne({
        where: { username: item.username },
      });

      if (check === undefined) {
        // const { newId, header } = await this.counterUserService.genId()
        const user = new AdminUser();
        user.name = item.name;
        user.username = item.username;
        user.password = await MyBcrypt.encrypt(item.password);
        user.is_active = item.is_active;
        await user.save();
      }
    }
  }
}
