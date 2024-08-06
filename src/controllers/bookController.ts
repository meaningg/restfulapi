import { Request, Response } from "express";
import { prisma } from "../app";

export const addBook = async (req: Request, res: Response) => {
  const { title, author, publicationDate, genres } = req.body;
  const book = await prisma.book.create({
    data: { title, author, publicationDate, genres },
  });
  res.json(book);
};

export const getBooks = async (req: Request, res: Response) => {
  const books = await prisma.book.findMany();
  res.json(books);
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await prisma.book.findUnique({ where: { id: Number(id) } });
  res.json(book);
};

export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, publicationDate, genres } = req.body;
  const book = await prisma.book.update({
    where: { id: Number(id) },
    data: { title, author, publicationDate, genres },
  });
  res.json(book);
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.book.delete({ where: { id: Number(id) } });
  res.status(204).send();
};
