import { Request, Response } from "express";
import HttpErrorService from "../services/http_error_service";
import prismaService from "../services/prisma_service";
import ResponseService from "../services/response_service";
import { createPlano as createPlanoSchema, updatePlano as updatePlanoSchema } from "../schemas/plano_schema";
import validateSchema from "../services/validade_schema";
export const createPlano = async (req: Request, res: Response): Promise<void> => {
    try {
        const validated = validateSchema(createPlanoSchema, req.body);
        const plano = await prismaService.plano.create({
            data: validated
        });
        ResponseService.created(res, { message: "Plano criado com sucesso", data: plano });
    } catch (error: any) {
        HttpErrorService.hadle(error, res);
    }
};

export const getPlanos = async (req: Request, res: Response) => {
    try {
        const planos = await prismaService.plano.findMany();
        ResponseService.success(res, {data: planos});
    } catch (error: any) {
        HttpErrorService.hadle(error, res);
    }
};

export const getPlano = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const plano = await prismaService.plano.findUnique({ where: { id: Number(id) } });
        ResponseService.success(res, {data: plano});
    } catch (error: any) {
        HttpErrorService.hadle(error, res);
    }
};

export const updatePlano = async (req: Request, res: Response) => {
    const { id } = req.params; 
    
    try {
        const validated = validateSchema(updatePlanoSchema, req.body);
        const plano = await prismaService.plano.update({
            where: { id: Number(id) },
            data: validated
        });
        ResponseService.success(res, { message: "Plano atualizado com sucesso", data: plano });
    } catch (error: any) {
        HttpErrorService.hadle(error, res);
    }
};

export const deletePlano = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prismaService.plano.delete({ where: { id: Number(id) } });
        ResponseService.success(res, {message: "Plano excluido com sucesso"});
    } catch (error: any) {
        HttpErrorService.hadle(error, res);
    }
};
