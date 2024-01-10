import { S3Client } from "@aws-sdk/client-s3"
import * as multerS3 from "multer-s3"
const bucketName = 'social-ola-talk'
const region = 'hn-1'
const accessKeyId = 'OYV3VONPCNVVCTW5PBKU'
const secretAccessKey = 'D03YW6FftNeRs77vKMSDRDrfVAQ7TPmMqr3gQZ86'
const endpoint ='https://s3.hn-1.cloud.cmctelecom.vn';
export const s3 = new S3Client({
    endpoint,
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
            cb(null, Date.now().toString() + '.' + file.mimetype.split('/').pop())
        },
        acl: "public-read"
    })
}