import { Module } from '@nestjs/common';
import { UnlockIcloudController } from './unlock-icloud.controller';
import { UnlockIcloudService } from './unlock-icloud.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UnlockIcloudSchema ,UnlockIcloud} from './schemas/unlock-icloud.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: UnlockIcloud.name, schema: UnlockIcloudSchema }]),],
  controllers: [UnlockIcloudController],
  providers: [UnlockIcloudService]
})
export class UnlockIcloudModule {}
