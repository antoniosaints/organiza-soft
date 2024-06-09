import prisma_service from "../services/prisma_service";

export const createCliente = async (req: any, res: any) => {
    const { nome, email, telefone, endereco } = req.body;
    try {
        const cliente = await prisma_service.cliente.create({
            data: { nome, email, telefone, endereco }
        });
        res.status(201).json(cliente);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getClientes = async (req: any, res: any) => {
    try {
        const clientes = await prisma_service.cliente.findMany();
        res.status(200).json(clientes);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getCliente = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        if (!id) throw new Error("ID obrigatorio");
        const cliente = await prisma_service.cliente.findUnique({ where: { id: Number(id) } });
        res.status(200).json(cliente);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const updateCliente = async (req: any, res: any) => {
    const { id } = req.params;
    const { nome, email, telefone, endereco } = req.body;
    try {
        const cliente = await prisma_service.cliente.update({
            where: { id: Number(id) },
            data: { nome, email, telefone, endereco }
        });
        res.status(200).json(cliente);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteCliente = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const cliente = await prisma_service.cliente.delete({ where: { id: Number(id) } });
        res.status(204).json({ data: cliente });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
