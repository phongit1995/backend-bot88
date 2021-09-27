import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsBooleanString, IsString } from "class-validator";

export class CreateCodeDto {
    @ApiProperty()
    @IsString()
    code:string ;

    @ApiProperty({example:true})
    @IsBoolean()
    type:boolean ;

    @ApiProperty({example:'Cấu hình điện thoại của bạn k phù hợp mã phần mềm này. Vui lòng nhập mã phần mềm khác'})
    @IsString()
    message:string ;
}