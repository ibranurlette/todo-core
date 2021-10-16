import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
// Utils
import { formatValidationError } from 'src/utils/format-validation-error';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    // if (object && object.content) {
    //   const arContentKeys = Object.keys(object.content)
    //   if (
    //     arContentKeys.length === 2 &&
    //     arContentKeys.includes('phone') &&
    //     arContentKeys.includes('via') &&
    //     object.info &&
    //     !object.info.device_id
    //   ) {
    //     throw new BadRequestException({
    //       messageTitle: 'Device Tidak Dikenal',
    //       message:
    //         'Silahkan Force Stop aplikasi melalui menu Setting, dan coba kembali'
    //     })
    //   }
    // }
    const errors = await validate(object);
    if (Array.isArray(errors) && errors.length > 0) {
      throw new BadRequestException({
        messageTitle: 'Form Isian Ditolak',
        message: 'Periksa kembali isian Anda.',
        errors: formatValidationError(errors),
      });
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
