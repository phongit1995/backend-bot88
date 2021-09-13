import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { ResPaginationDto } from 'src/common/text.helper';
import { ResCreateReferralCodeDto } from './create-referral-code.dto';

export class ListReferralCodeDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  page: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  pageSize: number;
}
export class ResGetListNewsDto extends ResPaginationDto {
  @ApiProperty({ type: [ResCreateReferralCodeDto] })
  records: ResCreateReferralCodeDto[];
}
