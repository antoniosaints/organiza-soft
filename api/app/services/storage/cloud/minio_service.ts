import * as Minio from "minio";
import "dotenv/config";

const MinioService = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT!,
  port: 443,
  useSSL: true,
  accessKey: process.env.S3_ACCESSKEY!,
  secretKey: process.env.S3_SECRETKEY!,
});

export { MinioService };
