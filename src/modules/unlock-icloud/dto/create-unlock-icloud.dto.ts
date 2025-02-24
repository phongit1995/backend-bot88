import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUnlockIcloudDto {
    @ApiProperty({ example: 'HELLO-APP' })
    @IsString()
    code: string;

    @ApiProperty({ example: 'VERIFY' })
    @IsString()
    codeVerify: string;

    @ApiProperty({ example: 'DUNGLUONG1' })
    @IsString()
    codeCapacity: string;
}