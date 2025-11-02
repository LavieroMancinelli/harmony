import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import authenticateToken from "./messageRoutes";

const router = Router();
const prisma = new PrismaClient();

router.patch("/me", authenticateToken, async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;
    const { username, email } = req.body;

    const updated = await prisma.user.update({
        where: { id: userId }, 
        data: { username, email },
    });
    res.json(updated);
});

export default router;