import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export default function authenticateToken(req: Request, res: Response, next: Function) {
    const authHeader = req.headers["authorization"];
    console.log("Auth header:", req.headers["authorization"]);
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        (req as any).user = user;
        next();
    });
}