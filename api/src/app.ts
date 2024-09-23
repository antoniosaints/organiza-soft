import cluster from "cluster";
import os from "os";
import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes/router";
import { stripeWebhook } from "./controllers/stripe";

const PORT = process.env.PORT || 6000;
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master process ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {cluster.fork()}
  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} morreu. Iniciando um novo...`);
    cluster.fork();
  });
} else {
  const app = express();
  app.use(cors());
  app.post("/stripe/webhook", express.raw({ type: "application/json" }), stripeWebhook);
  app.use(express.json());
  app.use(router);
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} iniciou o servidor na porta ${PORT} às ${new Date().toLocaleString("pt-BR")}`);
  });
}
