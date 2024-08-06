"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const body_parser_1 = __importDefault(require("body-parser"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
exports.app = app;
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
app.use(body_parser_1.default.json());
app.use("/books", bookRoutes_1.default);
app.use("/users", userRoutes_1.default);
