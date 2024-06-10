import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./src/routes/router";

const app = express();
const PORT = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());

app.use(router);

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT} às ${new Date().toLocaleString("pt-BR")}`);
});

