import { S3Client as S3 } from "@aws-sdk/client-s3";
import env from "../../../configs/env";

const R2Service = new S3({
    endpoint: env.R2_ENDPOINT,
    region: env.S3_REGION,
    credentials: {
        accessKeyId: env.R2_ACCESSKEY,
        secretAccessKey: env.R2_SECRETKEY
    },
})

export { R2Service };
