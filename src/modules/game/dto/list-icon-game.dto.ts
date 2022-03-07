import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class ResListIconGameDto {
  @ApiProperty()
  @IsString()
  image: string;
}
