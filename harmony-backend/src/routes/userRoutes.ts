import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import authenticateToken from "../middleware/authenticateToken";

const router = Router();
const prisma = new PrismaClient();

router.get("/me", authenticateToken, async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;
    const user = await prisma.user.findUnique({
        where: { id: userId }, 
        include: { messages: true },
    });
    res.json(user);
});

// update user
router.patch("/me", authenticateToken, async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;
    const { username, email } = req.body;

    const updated = await prisma.user.update({
        where: { id: userId }, 
        data: { username, email },
        include: { messages: true }
    });
    res.json(updated);
});

export default router;