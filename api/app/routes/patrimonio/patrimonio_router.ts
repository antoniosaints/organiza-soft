import { Router } from "express";
import produtosRouter from "./produtos_router";
import produtoCategoriaRouter from "./produto_categoria_router";
import fornecedoresRouter from "./fornecedores_router";
import armazensRouter from "./armazens_router";
import codigoBarraRouter from "./codigo_barra_router";
const patrimonioRouter = Router();

patrimonioRouter.use("/produto", produtosRouter);
patrimonioRouter.use("/categoria", produtoCategoriaRouter);
patrimonioRouter.use("/fornecedor", fornecedoresRouter);
patrimonioRouter.use("/armazen", armazensRouter);
patrimonioRouter.use("/gerarCodigoBarra", codigoBarraRouter);

export default patrimonioRouter;