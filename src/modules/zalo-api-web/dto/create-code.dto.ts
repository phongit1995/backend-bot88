import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsBooleanString, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCodeDto {
    @ApiProperty({ example: 'HELLO-APP' })
    @IsString()
    code: string;

    @ApiProperty({ example: 'HELLO-APP' })
    @IsString()
    message: string;

    @IsString()
    fullName: string;
    @IsString()
    phone: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    active: number;
}