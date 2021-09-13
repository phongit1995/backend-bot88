import { Controller, Get, HttpCode, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';

@ApiTags("Upload File")
@ApiConsumes("Upload File")
@Controller('upload')
export class UploadController {
    @Post()
    @ApiOperation({summary:"Upload file Api "})
    @UseInterceptors(
        FileInterceptor('file',{
            storage:diskStorage({
                destination:path.join(__dirname,'../../storage'),
                filename:(req, file, cb)=>{
                    cb(null,Date.now()+'-'+file.originalname)
                },
            }),
            fileFilter: function (req, file, callback) {
                var ext = path.extname(file.originalname);
                if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                    return callback(new Error('Only images are allowed'),false)
                }
                callback(null, true)
            },
        }),
    )
    async upload(@UploadedFile() file){
        console.log(file);
        return {filename:file.filename}
    }
    
    @Get('*')
    @ApiOperation({summary:"Get File Upload "})
    async file(@Req()req:Request,@Res() res: Response){
        let fileUrl:string = req.path.replace('/upload/','').trim();
        let url = path.join(__dirname,'..','..','storage',fileUrl);
        if(existsSync(url)){
            const file = createReadStream(url);
            file.pipe(res);
        }else{
            res.status(404).send('không có');
        }
    }
}
