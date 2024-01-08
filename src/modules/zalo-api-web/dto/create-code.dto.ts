import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateCodeDto {
    @ApiProperty({ example: 'HELLO-APP' })
    @IsString()
    code: string;

    @ApiProperty({ example: 'HELLO-APP' })
    @IsString()
    message: string;

    @IsString()
    fullName: string;

    @ApiProperty({ example: true })
    @IsOptional()
    @IsBoolean()
    active: boolean;
}