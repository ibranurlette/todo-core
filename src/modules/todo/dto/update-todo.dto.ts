import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'name tidak boleh kosong' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Description tidak boleh kosong' })
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'is_done tidak boleh kosong' })
  is_done: boolean;
}
