import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class VerifyZaloAuthCodeDto {
    @ApiProperty({ example: 'HELLO-APP' })
    @IsString()
    code: string;
}