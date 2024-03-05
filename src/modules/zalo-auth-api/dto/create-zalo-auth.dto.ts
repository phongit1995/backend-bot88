import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsBooleanString, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateZaloAuthCodeDto {
    @ApiProperty({ example: 'HELLO-APP' })
    @IsString()
    code: string;

    @ApiProperty({ example: 'VERIFY' })
    @IsString()
    codeVerify: string;
}