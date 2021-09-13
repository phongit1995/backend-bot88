import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { EUserType } from 'src/modules/users/user.constant';

export class CreateReferralCodeDto {
  @ApiProperty({ example: 'HELLO-APP' })
  @IsString()
  referralCode: string;

  @ApiProperty({
    example: EUserType.WEFINEX,
    description: 'type user when create',
  })
  @IsEnum(EUserType)
  typeAccount: number;
}
export class ResCreateReferralCodeDto {
  @ApiProperty({ example: 'HELLO-APP' })
  @IsString()
  referralCode: string;

  @ApiProperty({
    example: EUserType.WEFINEX,
    description: 'type user when create',
  })
  @IsEnum(EUserType)
  typeAccount: number;
}
