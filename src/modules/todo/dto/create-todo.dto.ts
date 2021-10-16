import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'name tidak boleh kosong' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Description tidak boleh kosong' })
  description: string;
}
