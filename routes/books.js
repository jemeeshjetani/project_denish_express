//defines endpoints

import express from 'express';
import { getBook, getBooks, createBook, updateBook, deleteBook } from '../controller/bookController.js';

const router = express.Router();

router.get('/', getBooks);  //get all

router.get('/:id', getBook);  //get one

router.post('/', createBook);  //add 

router.put('/:id', updateBook);  //update

router.delete('/:id', deleteBook);  //delete

export default router;
