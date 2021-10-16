import { IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ViaEnum } from 'src/commons/enums/via.enum';

export class InfoOfficeDto {
  @ApiProperty({ type: String, enum: ViaEnum })
  @IsNotEmpty()
  @IsEnum(ViaEnum)
  via: ViaEnum;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  app_version: string;
}
