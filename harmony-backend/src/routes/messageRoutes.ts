import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// authenticate token
function authenticateToken(req: Request, res: Response, next: Function) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        (req as any).user = user;
        next();
    });
}

// get all messages
router.get("/", async (_req: Request, res: Response) => {
    const messages = await prisma.message.findMany({
        include: { user: true },
        orderBy: { createdAt: "desc" },
    });
    res.json(messages);
});

// post new message
router.post("/", authenticateToken, async (req: Request, res: Response) => {
    const { content } = req.body;
    const userId = (req as any).user.userId;

    const message = await prisma.message.create({
        data: { content, userId },
    })
    res.json(message);
});

export default router;