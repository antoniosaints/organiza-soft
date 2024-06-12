import HttpErrorService from "../services/http_error_service";
import prismaService from "../services/prisma_service";
import ResponseService from "../services/response_service";

export const createBloqueio = async (req: any, res: any) => {
    const { assinaturaId, motivo, dataBloqueio, dataDesbloqueio } = req.body;
    try {
        const bloqueio = await prismaService.bloqueio.create({
            data: { assinaturaId, motivo, dataBloqueio, dataDesbloqueio }
        });
        ResponseService.created(res, {message: "Bloqueio criado com sucesso", data: bloqueio});
    } catch (error: any) {
        HttpErrorService.hadle(error, res);
    }
};

export const getBloqueios = async (req: any, res: any) => {
    try {
        const bloqueios = await prismaService.bloqueio.findMany();
        ResponseService.success(res, {data: bloqueios});
    } catch (error: any) {
        HttpErrorService.hadle(error, res);
    }
};

export const getBloqueio = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const bloqueio = await prismaService.bloqueio.findUnique({ where: { id: Number(id) } });
        ResponseService.success(res, {data: bloqueio});
    } catch (error: any) {
        HttpErrorService.hadle(error, res);
    }
};

export const updateBloqueio = async (req: any, res: any) => {
    const { id } = req.params;
    const { assinaturaId, motivo, dataBloqueio, dataDesbloqueio } = req.body;
    try {
        const bloqueio = await prismaService.bloqueio.update({
            where: { id: Number(id) },
            data: { assinaturaId, motivo, dataBloqueio, dataDesbloqueio }
        });
        ResponseService.success(res, {message: "Bloqueio atualizado com sucesso", data: bloqueio});
    } catch (error: any) {
        HttpErrorService.hadle(error, res);
    }
};

export const deleteBloqueio = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        await prismaService.bloqueio.delete({ where: { id: Number(id) } });
        ResponseService.success(res, {message: "Bloqueio excluido com sucesso"});
    } catch (error: any) {
        HttpErrorService.hadle(error, res);
    }
};
