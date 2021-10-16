import { AuthGuard } from '@nestjs/passport';
import {
  Injectable,
  HttpException,
  HttpStatus,
  ExecutionContext,
} from '@nestjs/common';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
// import { FirebaseMessageTypeEnum } from 'src/constants/enums/firebase.enum'

@Injectable()
export class TodoAuthGuard extends AuthGuard('officejwt') {
  private handleJwtError(error: Error) {
    if (error instanceof TokenExpiredError) {
      // do stuff when token is expired
      throw new HttpException(
        {
          //   messageType: FirebaseMessageTypeEnum.SESSION_EXPIRED,
          messageTitle: 'Sesi kadaluarsa',
          message: 'Sesi Anda telah berakhir. Silahkan login kembali',
        },
        HttpStatus.FORBIDDEN,
      );
    } else if (error instanceof JsonWebTokenError) {
      // do stuff when token is invalid
      throw new HttpException(
        { message: 'INVALID TOKEN' },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    // const fullArgs = request.body
    const authorization: string = request.headers.authorization;
    if (!authorization || authorization.length === 0) {
      throw new HttpException(
        { message: 'Not Authorized' },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const arAuthorization = authorization.split(' ');
    if (arAuthorization.length !== 2 || arAuthorization[0] !== 'Bearer') {
      throw new HttpException(
        { message: 'Not Authorized' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info: Error) {
    this.handleJwtError(info);
    return user;
  }
}
