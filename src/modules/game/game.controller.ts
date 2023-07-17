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
      'https://res.cloudinary.com/no-company-name/image/upload/v1646665091/bot88-image/d9155d88f1f63ea867e71_bxsrkv.jpg',
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
    return image;
  }
  @Get('/list-game')
  @ApiOperation({
    summary: 'list game icon',
  })
  @ApiOkResponse({ status: 200, type: [String] })
  async listGame() {
    const image: string[] = [
      'https://res.cloudinary.com/app-event/image/upload/v1687006698/icon-bot88/790b7572a044711a285518_ikaulh.jpg',
      'https://res.cloudinary.com/app-event/image/upload/v1687006698/icon-bot88/751f855c506a8134d87b8_bwkceg.jpg',
      'https://res.cloudinary.com/app-event/image/upload/v1687006698/icon-bot88/1295e5d630e0e1beb8f17_iagt0d.jpg',
      'https://res.cloudinary.com/app-event/image/upload/v1687006698/icon-bot88/175c1225c713164d4f0222_fjvwdo.jpg',
      'https://res.cloudinary.com/app-event/image/upload/v1687006698/icon-bot88/012bf77f2249f317aa583_alnygd.jpg',
      'https://res.cloudinary.com/app-event/image/upload/v1687006697/icon-bot88/2f9c27e5f2d3238d7ac219_cpe5sr.jpg',
      'https://res.cloudinary.com/app-event/image/upload/v1687006698/icon-bot88/4e7049099c3f4d61142e21_lopkad.jpg',
      'https://res.cloudinary.com/app-event/image/upload/v1687006698/icon-bot88/6fa095e340d5918bc8c46_xmw60e.jpg',
      'https://res.cloudinary.com/app-event/image/upload/v1687006697/icon-bot88/ec150656d360023e5b7116_ptgsof.jpg',
      'https://res.cloudinary.com/app-event/image/upload/v1687006697/icon-bot88/dbd43697e3a132ff6bb010_qjj80n.jpg',
      'https://res.cloudinary.com/app-event/image/upload/v1687006697/icon-bot88/e5760135d403055d5c1217_t0v6ek.jpg',
      'https://res.cloudinary.com/app-event/image/upload/v1687006697/icon-bot88/d77d3e3eeb083a56631915_q5fmv9.jpg',
      'https://res.cloudinary.com/app-event/image/upload/v1687006697/icon-bot88/c53e2e7dfb4b2a15735a12_mudtpc.jpg',
      'https://res.cloudinary.com/app-event/image/upload/v1687006697/icon-bot88/de032a40ff762e2877679_vzlkla.jpg',
      'https://res.cloudinary.com/app-event/image/upload/v1687006697/icon-bot88/d6d42280f7b626e87fa71_dai6aj.jpg',
      'https://res.cloudinary.com/app-event/image/upload/v1687006697/icon-bot88/97576414b122607c393311_re7bv9.jpg',
      'https://res.cloudinary.com/app-event/image/upload/v1687006696/icon-bot88/47574d2e98184946100920_u2vebo.jpg',
      'https://res.cloudinary.com/app-event/image/upload/v1687006697/icon-bot88/af5d5a098f3f5e61072e2_mlguwc.jpg',
      'https://res.cloudinary.com/app-event/image/upload/v1687006696/icon-bot88/95647927ac117d4f240013_imodei.jpg',
      'https://res.cloudinary.com/app-event/image/upload/v1687006696/icon-bot88/2799c9da1ceccdb294fd14_gwtcvd.jpg',
      'https://res.cloudinary.com/app-event/image/upload/v1687006696/icon-bot88/5548a00b753da463fd2c4_eiubd8.jpg',
      'https://res.cloudinary.com/app-event/image/upload/v1687006696/icon-bot88/a6b556e183d752890bc65_tedoxn.jpg',
      'https://res.cloudinary.com/app-event/image/upload/v1687059501/icon-bot88/2a5291f1a71676482f071_xbyz1a.jpg',
      'https://res.cloudinary.com/app-event/image/upload/v1687059501/icon-bot88/a84612e52402f55cac132_flgik5.jpg',
      'https://res.cloudinary.com/app-event/image/upload/v1687059501/icon-bot88/11aba9089fef4eb117fe3_tbvapc.jpg'
    ];
    return image;
  }
}
