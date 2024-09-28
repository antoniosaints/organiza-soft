import { Request, Response } from "express";
import HttpErrorService from "../../services/http_error_service";
import prismaService from "../../services/prisma_service";
import ResponseService from "../../services/response_service";
import { createBloqueio as createBloqueioSchema, updateBloqueio as updateBloqueioSchemae } from "../../schemas/assinaturas/bloqueio_schema";
import validateSchema from "../../services/validade_schema";

export const createBloqueio = async (req: Request, res: Response) => {
    
    try {
        const validated = validateSchema(createBloqueioSchema, req.body);
        const bloqueio = await prismaService.assinaturaBloqueio.create({
            data: validated
        });
        ResponseService.created(res, { message: "Bloqueio criado com sucesso", data: bloqueio });
    } catch (error: any) {
        HttpErrorService.hadle(error, res);
    }
};

export const getBloqueios = async (req: Request, res: Response) => {
    try {
        const bloqueios = await prismaService.assinaturaBloqueio.findMany({
            where: { contaSistemaId: req.body.contaSistemaId },
        });
        ResponseService.success(res, { data: bloqueios });
    } catch (error: any) {
        HttpErrorService.hadle(error, res);
    }
};

export const getBloqueio = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const bloqueio = await prismaService.assinaturaBloqueio.findUnique({ where: { id: Number(id), contaSistemaId: req.body.contaSistemaId } });
        ResponseService.success(res, { data: bloqueio });
    } catch (error: any) {
        HttpErrorService.hadle(error, res);
    }
};

export const updateBloqueio = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const validated = validateSchema(updateBloqueioSchemae, req.body)
        const bloqueio = await prismaService.assinaturaBloqueio.update({
            where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
            data: validated
        });
        ResponseService.success(res, { message: "Bloqueio atualizado com sucesso", data: bloqueio });
    } catch (error: any) {
        HttpErrorService.hadle(error, res);
    }
};

export const deleteBloqueio = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prismaService.assinaturaBloqueio.delete({ where: { id: Number(id), contaSistemaId: req.body.contaSistemaId } });
        ResponseService.success(res, { message: "Bloqueio excluido com sucesso" });
    } catch (error: any) {
        HttpErrorService.hadle(error, res);
    }
};
