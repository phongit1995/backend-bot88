import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateConfigDataDto {
    @ApiProperty()
    @IsString()
    zaloPhone:string;
}