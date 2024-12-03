import * as Minio from "minio";
import "dotenv/config";

const MinioService = new Minio.Client({
  endPoint: process.env.S3ENDPOINT!,
  port: 443,
  useSSL: true,
  accessKey: process.env.S3ACCESSKEY!,
  secretKey: process.env.S3SECRETKEY!,
});

export { MinioService };
