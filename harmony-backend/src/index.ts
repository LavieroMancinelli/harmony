 import express, {Request, Response} from "express";
 import cors from "cors";
 import dotenv from "dotenv";
 import { PrismaClient } from "@prisma/client";
 import { createServer } from "http";
 import { Server } from "socket.io";
 import authRoutes from "./routes/auth";
 import messageRoutes from "./routes/messageRoutes";
 import userRoutes from "./routes/userRoutes";

 dotenv.config();
 const app = express();
 const prisma = new PrismaClient();

 app.use(cors());
 app.use(express.json());

 app.use("/auth", authRoutes);
 app.use("/messages", messageRoutes);
 app.use("/users", userRoutes);

 app.get("/", (_req: Request, res: Response) => {
   res.send("Harmony backend running");
 })

 const server = createServer(app);
 const io = new Server(server, {
  cors: { origin: "*" },  
 });

 app.set("io", io);

 io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
 });

 export { io };

 const PORT = process.env.PORT || 4000;
 server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

 /*
 app.get("/users", async (_req: Request, res: Response) => {
   const users = await prisma.user.findMany();
   res.json(users);
 });

 const PORT = process.env.PORT || 4000;

 app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
 });
 */