import * as Minio from "minio";
import env from "../../../configs/env";

const MinioService = new Minio.Client({
  endPoint: env.MINIO_ENDPOINT,
  port: 443,
  useSSL: true,
  accessKey: env.MINIO_ACCESSKEY,
  secretKey: env.MINIO_SECRETKEY,
});

export { MinioService };
