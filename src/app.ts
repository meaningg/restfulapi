import express from "express";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import bookRoutes from "./routes/bookRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use("/books", bookRoutes);
app.use("/users", userRoutes);

export { app, prisma };
