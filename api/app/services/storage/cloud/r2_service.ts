import { S3Client as S3 } from "@aws-sdk/client-s3";
import "dotenv/config";

const R2Service = new S3({
    endpoint: process.env.R2_ENDPOINT!,
    region: process.env.S3_REGION!,
    credentials: {
        accessKeyId: process.env.R2_ACCESSKEY!,
        secretAccessKey: process.env.R2_SECRETKEY!,
    },
})

export { R2Service };
