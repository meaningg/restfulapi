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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getBooks = exports.addBook = void 0;
const app_1 = require("../app");
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, publicationDate, genres } = req.body;
    const book = yield app_1.prisma.book.create({
        data: { title, author, publicationDate, genres },
    });
    res.json(book);
});
exports.addBook = addBook;
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield app_1.prisma.book.findMany();
    res.json(books);
});
exports.getBooks = getBooks;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const book = yield app_1.prisma.book.findUnique({ where: { id: Number(id) } });
    res.json(book);
});
exports.getBookById = getBookById;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, author, publicationDate, genres } = req.body;
    const book = yield app_1.prisma.book.update({
        where: { id: Number(id) },
        data: { title, author, publicationDate, genres },
    });
    res.json(book);
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield app_1.prisma.book.delete({ where: { id: Number(id) } });
    res.status(204).send();
});
exports.deleteBook = deleteBook;
