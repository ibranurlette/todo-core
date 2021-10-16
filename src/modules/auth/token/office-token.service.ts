import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { IPayload } from 'src/commons/strategies/payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRefreshTokenRepository } from 'src/commons/repositories/admin/refresh-token.repository';
import { generateRandomString } from 'src/utils/genRandomString';

@Injectable()
export class OfficeTokenService {
  constructor(
    @InjectRepository(AdminRefreshTokenRepository)
    private readonly adminRefreshTokenRepository: AdminRefreshTokenRepository,
  ) {}

  createAccessToken(payload: IPayload): string {
    const accessToken = sign(payload, process.env.OFFICE_ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.OFFICE_ACCESS_TOKEN_EXPIRED,
    });
    return accessToken;
  }

  async createRefreshToken(payload: IPayload): Promise<string> {
    const token = await this.genRefreshToken();
    const refreshToken = await this.adminRefreshTokenRepository.createOrUpdate(
      payload,
      token,
    );

    return refreshToken.token;
  }

  private async genRefreshToken(): Promise<string> {
    let refreshToken = generateRandomString(150);
    const check = await this.adminRefreshTokenRepository.findOne({
      where: { token: refreshToken },
    });
    if (check) {
      refreshToken = await this.genRefreshToken();
    }
    return refreshToken;
  }

  async getRefreshTokenFromToken(token: string) {
    return await this.adminRefreshTokenRepository.findOne({
      where: { token },
    });
  }

  async destroyRefreshToken(payload: IPayload) {
    const refreshToken = await this.adminRefreshTokenRepository.findOne({
      where: { user_id: payload.user_id },
    });
    if (refreshToken) {
      await refreshToken.remove();
    }
  }
}
