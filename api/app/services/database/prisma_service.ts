import { PrismaClient } from "@prisma/client";

const prismaService = new PrismaClient({
    errorFormat: "minimal",
    log: [
        "error"
    ]
});

export default prismaService;