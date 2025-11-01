 import express, {Request, Response} from "express";
 import cors from "cors";
 import dotenv from "dotenv";

 dotenv.config();
 const app = express();

 app.use(cors());
 app.use(express.json());

 app.get("/", (_req: Request, res: Response) => {
    res.send("Harmony backend running");
 });

 const PORT = process.env.PORT || 4000;
 app.listen(PORT, () => {
    console.log('Server running on port${PORT}');
 });