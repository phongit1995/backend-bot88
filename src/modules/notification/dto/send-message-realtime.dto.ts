import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { ERealTimePick } from "../notification.enum";

export class SendMessageRealTimeDto {
    @ApiProperty({description:' gui len xanh hoac do',default:ERealTimePick.XANH})
    @IsEnum(ERealTimePick)
    type:string ;
}