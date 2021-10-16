import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import _ from 'lodash';
import { IPayload } from 'src/commons/strategies/payload.interface';

import { OfficeTokenService } from './token/office-token.service';

import { OfficeAuthLoginDto } from './dto/office-auth-login.dto';
import { AdminUser } from 'src/database/entities/admin/users.entity';
import { MyBcrypt } from 'src/utils/myBcrypt';

@Injectable()
export class OfficeAuthService {
  constructor(
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: Repository<AdminUser>,
    private readonly officeTokenService: OfficeTokenService,
  ) {}

  async login(args: OfficeAuthLoginDto): Promise<any> {
    const user = await this.adminUserRepository.findOne({
      where: { username: args.username },
    });
    if (user === undefined) {
      throw new HttpException(
        {
          message: 'Not found',
          errors: {
            content: { username: ['Username tidak ditemukan'] },
          },
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const validPass = await MyBcrypt.check(args.password, user.password);
    if (validPass === false) {
      throw new HttpException(
        {
          message: 'Not found',
          errors: {
            content: {
              password: ['Kombinasi Username dan Password tidak ditemukan'],
            },
          },
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const payload: IPayload = { user_id: user.id };
    const accessToken = this.officeTokenService.createAccessToken(payload);
    const refreshToken = await this.officeTokenService.createRefreshToken(
      payload,
    );
    console.log({ accessToken, refreshToken });

    return { accessToken, refreshToken };

    // const token = randomstring.generate(150)
    // const expiredToken = moment(new Date())
    //   .add(1, 'days')
    //   .toDate()

    // user.token = token
    // user.token_expired = expiredToken
    // await user.save()

    // return { Authorization: token }
  }

  // async getUserByToken(authorization: string): Promise<AdminUser> {
  //   const arAuthorization = authorization.split(' ')
  //   if (arAuthorization.length !== 2 || arAuthorization[0] !== 'Bearer') {
  //     throw {
  //       statusCode: HttpStatus.UNAUTHORIZED,
  //       message: 'Invalid token',
  //       errors: null
  //     }
  //   }
  //   const token = arAuthorization[1]
  //   const user = await this.adminUserRepository.findOne({
  //     where: {
  //       token: token,
  //       token_expired: MoreThan(new Date())
  //     }
  //   })
  //   if (user) {
  //     return user
  //   }

  //   throw {
  //     statusCode: HttpStatus.NOT_FOUND,
  //     message: 'Not found',
  //     errors: null
  //   }
  // }

  async getProfile(id: string) {
    const officeUser = await this.adminUserRepository.findOne({
      where: { id },
    });
    if (officeUser === undefined) {
      throw new HttpException(
        { message: 'Data not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return officeUser;
  }
}
