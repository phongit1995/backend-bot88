import { S3Client } from "@aws-sdk/client-s3"
import multer from "multer"
import * as multerS3 from "multer-s3"

const bucketName = 'mys3dat09'
const region = 'ap-southeast-2'
const accessKeyId = 'AKIASKEVGBL3TT6OE5FC'
const secretAccessKey = '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'
export const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
})
export const bucketParams = (key) => ({ Bucket: bucketName, Key: key });
export const multerS3Options = {
    storage: multerS3({
        s3: s3,
        bucket: bucketName,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + file.originalname)
        },
        acl: "public-read"
    })
}