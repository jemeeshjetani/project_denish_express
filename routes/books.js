import express from 'express';
import { getBook, getBooks, createBook, updateBook, deleteBook } from '../controller/postController.js';

const router = express.Router();

router.get('/api/books', getBooks);  //get all

router.get('/api/books/:id', getBook);  //get one

router.post('/api/books', createBook);  //add 

router.put('/api/books/:id', updateBook);  //update

router.delete('/api/books/:id', deleteBook);  //delete

export default router;
