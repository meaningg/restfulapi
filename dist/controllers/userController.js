"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRole = exports.getCurrentUser = exports.loginUser = exports.registerUser = void 0;
const app_1 = require("../app");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "your_jwt_secret";
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield app_1.prisma.user.create({
            data: { username, password: hashedPassword, email, role: 1 },
        });
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield app_1.prisma.user.findUnique({ where: { username } });
    if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: "1h",
    });
    res.json({ token });
});
exports.loginUser = loginUser;
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield app_1.prisma.user.findUnique({
        where: { id: req.user.userId },
    });
    res.json(user);
});
exports.getCurrentUser = getCurrentUser;
const updateUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { role } = req.body;
    const user = yield app_1.prisma.user.update({
        where: { id: Number(id) },
        data: { role },
    });
    res.json(user);
});
exports.updateUserRole = updateUserRole;
