//defines endpoints

import express from "express";
import {
 getBooks,
 getBook,
 createBook,
 updateBook,
 deleteBook,
} from "../controller/bookController.js";

const router = express.Router();

router.post("/", getBooks); //get all. We converted GET into POST because it is easy for developer to 'send' & 'query' data from req.body rather than as a URL query parameters.

router.get("/:id", getBook); //get one

router.post("/create", createBook); //add

router.put("/:id", updateBook); //update

router.delete("/:id", deleteBook); //delete

export default router;
