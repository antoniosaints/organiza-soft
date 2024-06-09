import prisma_service from "../services/prisma_service";

export const createUsuario = async (req: any, res: any) => {
    const { nome, email, senha } = req.body;
    try {
        const usuario = await prisma_service.usuario.create({
            data: { nome, email, senha }
        });
        res.status(201).json(usuario);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getUsuarios = async (req: any, res: any) => {
    try {
        const usuarios = await prisma_service.usuario.findMany();
        res.status(200).json(usuarios);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getUsuario = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const usuario = await prisma_service.usuario.findUnique({ where: { id: Number(id) } });
        res.status(200).json(usuario);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const updateUsuario = async (req: any, res: any) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    try {
        const usuario = await prisma_service.usuario.update({
            where: { id: Number(id) },
            data: { nome, email, senha }
        });
        res.status(200).json(usuario);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteUsuario = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        await prisma_service.usuario.delete({ where: { id: Number(id) } });
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
