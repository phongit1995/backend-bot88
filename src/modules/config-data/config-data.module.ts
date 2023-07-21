import { Module } from '@nestjs/common';
import { ConfigDataService } from './config-data.service';
import { ConfigDataController } from './config-data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigData, ConfigDataSchema } from './schemas/config-data.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:ConfigData.name,schema:ConfigDataSchema}])
  ],
  providers: [ConfigDataService],
  controllers: [ConfigDataController]
})
export class ConfigDataModule {}
