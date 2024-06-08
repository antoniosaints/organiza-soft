import prisma_service from "../services/prisma_service";

class UsuariosRepository {
    async create(data: any) {
        const user = await prisma_service.user.create({
            data: {
                ...data
            },
        });

        return user;
    }
}