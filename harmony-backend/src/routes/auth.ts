import {Router, Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "secretkey"

router.post("/signup", async (req: Request, res: Response) => {
    const { email, password, username } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email }});
    if (existingUser) return res.status(400).json({ error: "Email already exists"});

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { email, password: hashedPassword, username },
    });

    res.json({ message: "User created", user });
});

router.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body; 

    const user = await prisma.user.findUnique({ where: { email }});
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) return res.status(400).json({ error: "Invalid email or pasword" });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({ message: "Login successful", token });
});

export default router;