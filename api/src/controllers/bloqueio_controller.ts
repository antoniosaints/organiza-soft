import prisma_service from "../services/prisma_service";

export const createBloqueio = async (req, res) => {
    const { clienteId, motivo, dataBloqueio, dataDesbloqueio } = req.body;
    try {
        const bloqueio = await prisma_service.bloqueio.create({
            data: { clienteId, motivo, dataBloqueio, dataDesbloqueio }
        });
        res.status(201).json(bloqueio);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getBloqueios = async (req, res) => {
    try {
        const bloqueios = await prisma_service.bloqueio.findMany();
        res.status(200).json(bloqueios);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getBloqueio = async (req, res) => {
    const { id } = req.params;
    try {
        const bloqueio = await prisma_service.bloqueio.findUnique({ where: { id: Number(id) } });
        res.status(200).json(bloqueio);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateBloqueio = async (req, res) => {
    const { id } = req.params;
    const { clienteId, motivo, dataBloqueio, dataDesbloqueio } = req.body;
    try {
        const bloqueio = await prisma_service.bloqueio.update({
            where: { id: Number(id) },
            data: { clienteId, motivo, dataBloqueio, dataDesbloqueio }
        });
        res.status(200).json(bloqueio);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteBloqueio = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma_service.bloqueio.delete({ where: { id: Number(id) } });
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
