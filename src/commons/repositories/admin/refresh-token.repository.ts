import { Repository, EntityRepository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as moment from 'moment';

import { IPayload } from 'src/commons/strategies/payload.interface';

import { AdminRefreshToken } from 'src/database/entities/admin/refresh-token.entity';

@EntityRepository(AdminRefreshToken)
export class AdminRefreshTokenRepository extends Repository<AdminRefreshToken> {
  async createOrUpdate(
    payload: IPayload,
    token: string,
  ): Promise<AdminRefreshToken> {
    let refreshToken = new AdminRefreshToken();
    const check = await this.findOne({
      where: { user_id: payload.user_id },
    });
    if (check) {
      refreshToken = check;
    }
    const expired_at = moment(new Date())
      .add(Number(process.env.OFFICE_REFRESH_TOKEN_EXPIRED_DAYS), 'days')
      .toDate();
    refreshToken.user_id = payload.user_id;
    refreshToken.token = token;
    refreshToken.expired_at = expired_at;
    await refreshToken.save();
    return refreshToken;
  }

  async destroy(token: string): Promise<void> {
    const refreshToken = await this.findOne({
      where: { token },
    });
    if (refreshToken) {
      await refreshToken.remove();
    }
  }

  async getFromToken(token: string): Promise<AdminRefreshToken> {
    const refreshToken = await this.findOne({
      where: { token },
    });
    if (!refreshToken) {
      throw new HttpException(
        { message: 'Token INVALID' },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return refreshToken;
  }
}
