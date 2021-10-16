import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { InfoOfficeDto } from 'src/commons/constants/dto/info-office.dto';

export class OfficeAuthLoginDto {
  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => InfoOfficeDto)
  info: InfoOfficeDto;

  @ApiProperty()
  @IsNotEmpty({ message: 'Username tidak boleh kosong' })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  password: string;
}
