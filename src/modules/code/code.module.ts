import { Module } from '@nestjs/common';
import { CodeService } from './code.service';
import { CodeController } from './code.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Code, CodeSchema } from './schema/code.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Code.name,schema:CodeSchema}])
  ],
  providers: [CodeService],
  controllers: [CodeController]
})
export class CodeModule {}
