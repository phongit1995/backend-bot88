import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResListIconGameDto } from './dto/list-icon-game.dto';
@ApiTags('game')
@Controller('game')
export class GameController {
  @Get('/list-icon')
  @ApiOperation({
    summary: 'list icon game ',
  })
  @ApiOkResponse({ status: 200, type: [String] })
  async list() {
    const image: string[] = [
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665092/bot88-image/1b0d7192ddec12b24bfd4_eewfjq.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665092/bot88-image/05f4c1686d16a248fb073_yzcg3s.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665092/bot88-image/3aa40e20a25e6d00344f13_y9nvn8.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665092/bot88-image/3b3c4123aa5d65033c4c25_r4dn5k.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665091/bot88-image/1ac25d9e95e05abe03f1_edaall.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665092/bot88-image/f4f9e3110c6fc3319a7e_cq43zv.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665091/bot88-image/0a57b4ca18b4d7ea8ea52_wbr41d.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665090/bot88-image/c5e9b88669f8a6a6ffe9_eb98wj.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665090/bot88-image/be136c8cc0f20fac56e36_yozucq.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665091/bot88-image/c5e9b88669f8a6a6ffe928_s3vpsl.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665090/bot88-image/a2055084fcfa33a46aeb7_xiakci.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665090/bot88-image/af827c04d07a1f24466b16_ytczcc.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665089/bot88-image/71687febd3951ccb45848_rsy4la.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665090/bot88-image/bc53da440b3ac4649d2b_mxtxfx.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665089/bot88-image/961be7720c0cc3529a1d21_vsvfd7.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665089/bot88-image/989b821c2e62e13cb87315_iq9kka.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665090/bot88-image/205982ca45b48aead3a5_tkzzxc.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665089/bot88-image/95a35221fe5f3101684e10_s8ywfe.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665090/bot88-image/ad794ee6e2982dc674895_bjzzfv.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665089/bot88-image/414ffaca56b499eac0a511_vucr6u.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665089/bot88-image/79397fb1d3cf1c9145de20_ioshhb.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665088/bot88-image/85cc1a48b6367968202714_cglphs.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665088/bot88-image/8f0267128c6c43321a7d22_ewgahb.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665088/bot88-image/6d78a1634a1d8543dc0c24_eizngc.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665088/bot88-image/6d78a1634a1d8543dc0c24_eizngc.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665088/bot88-image/63bd82352e4be115b85a18_sgkhzj.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665089/bot88-image/92f6e0e00b9ec4c09d8f23_ocruuf.jpg',
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665088/bot88-image/5c9694a57fdbb085e9ca27_otssxy.jpg',
    ];
    console.log(image.length);
    return image;
  }
}
