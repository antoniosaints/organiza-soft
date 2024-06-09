import prisma_service from "../services/prisma_service";

export const createTransacao = async (req: any, res: any) => {
    const { clienteId, data, valor, tipo, descricao } = req.body;
    try {
        const transacao = await prisma_service.transacao.create({
            data: { clienteId, data, valor, tipo, descricao }
        });
        res.status(201).json(transacao);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getTransacoes = async (req: any, res: any) => {
    try {
        const transacoes = await prisma_service.transacao.findMany();
        res.status(200).json(transacoes);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getTransacao = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const transacao = await prisma_service.transacao.findUnique({ where: { id: Number(id) } });
        res.status(200).json(transacao);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const updateTransacao = async (req: any, res: any) => {
    const { id } = req.params;
    const { clienteId, data, valor, tipo, descricao } = req.body;
    try {
        const transacao = await prisma_service.transacao.update({
            where: { id: Number(id) },
            data: { clienteId, data, valor, tipo, descricao }
        });
        res.status(200).json(transacao);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteTransacao = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        await prisma_service.transacao.delete({ where: { id: Number(id) } });
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
