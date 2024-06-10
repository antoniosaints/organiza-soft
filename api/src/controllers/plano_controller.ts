import HttpErrorService from "../services/http_error_service";
import prismaService from "../services/prisma_service";
import ResponseService from "../services/response_service";

export const createPlano = async (req: any, res: any) => {
    const { nome, descricao, preco, cor } = req.body;
    try {
        const plano = await prismaService.plano.create({
            data: { nome, descricao, preco, cor }
        });
        ResponseService.created(res, { message: "Plano criado com sucesso", data: plano });
    } catch (error: any) {
        HttpErrorService.hadle(error, res);
    }
};

export const getPlanos = async (req: any, res: any) => {
    try {
        const planos = await prismaService.plano.findMany();
        ResponseService.success(res, {data: planos});
    } catch (error: any) {
        HttpErrorService.hadle(error, res);
    }
};

export const getPlano = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const plano = await prismaService.plano.findUnique({ where: { id: Number(id) } });
        ResponseService.success(res, {data: plano});
    } catch (error: any) {
        HttpErrorService.hadle(error, res);
    }
};

export const updatePlano = async (req: any, res: any) => {
    const { id } = req.params;
    const { nome, descricao, preco } = req.body;
    try {
        const plano = await prismaService.plano.update({
            where: { id: Number(id) },
            data: { nome, descricao, preco }
        });
        ResponseService.success(res, { message: "Plano atualizado com sucesso", data: plano });
    } catch (error: any) {
        HttpErrorService.hadle(error, res);
    }
};

export const deletePlano = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        await prismaService.plano.delete({ where: { id: Number(id) } });
        ResponseService.success(res, {message: "Plano excluido com sucesso"});
    } catch (error: any) {
        HttpErrorService.hadle(error, res);
    }
};
