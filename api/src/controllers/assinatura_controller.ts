import prisma_service from "../services/prisma_service";

export const createAssinatura = async (req: any, res: any) => {
    const { clienteId, planoId, dataInicio, dataFim, status } = req.body;
    try {
        const assinatura = await prisma_service.assinatura.create({
            data: { clienteId, planoId, dataInicio, dataFim, status }
        });
        res.status(201).json(assinatura);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getAssinaturas = async (req: any, res: any) => {
    try {
        const assinaturas = await prisma_service.assinatura.findMany();
        res.status(200).json(assinaturas);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getAssinatura = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const assinatura = await prisma_service.assinatura.findUnique({ where: { id: Number(id) } });
        res.status(200).json(assinatura);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const updateAssinatura = async (req: any, res: any) => {
    const { id } = req.params;
    const { clienteId, planoId, dataInicio, dataFim, status } = req.body;
    try {
        const assinatura = await prisma_service.assinatura.update({
            where: { id: Number(id) },
            data: { clienteId, planoId, dataInicio, dataFim, status }
        });
        res.status(200).json(assinatura);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteAssinatura = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        await prisma_service.assinatura.delete({ where: { id: Number(id) } });
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
