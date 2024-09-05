//defines endpoints

import express from "express";
import {
	getBooks,
	updateBook,
	deleteBook,
} from "../controller/bookController.js";

const router = express.Router();

router.post("/", getBooks); //get all

// router.get("/:id", getBook); //get one

// router.post("/", createBook); //add

router.put("/:id", updateBook); //update

router.delete("/:id", deleteBook); //delete

export default router;
