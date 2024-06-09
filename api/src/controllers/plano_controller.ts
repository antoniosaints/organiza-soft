import prisma_service from "../services/prisma_service";

export const createPlano = async (req: any, res: any) => {
    const { nome, descricao, preco } = req.body;
    try {
        const plano = await prisma_service.plano.create({
            data: { nome, descricao, preco }
        });
        res.status(201).json(plano);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getPlanos = async (req: any, res: any) => {
    try {
        const planos = await prisma_service.plano.findMany();
        res.status(200).json(planos);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getPlano = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const plano = await prisma_service.plano.findUnique({ where: { id: Number(id) } });
        res.status(200).json(plano);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const updatePlano = async (req: any, res: any) => {
    const { id } = req.params;
    const { nome, descricao, preco } = req.body;
    try {
        const plano = await prisma_service.plano.update({
            where: { id: Number(id) },
            data: { nome, descricao, preco }
        });
        res.status(200).json(plano);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const deletePlano = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        await prisma_service.plano.delete({ where: { id: Number(id) } });
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
