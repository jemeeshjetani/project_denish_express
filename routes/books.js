//defines endpoints

import express from "express";
import {
 getBooks,
 getBook,
 createBook,
 updateBook,
 deleteBook,
} from "../controller/bookController.js";
import {
 validateGetAllReqBody,
 validateRequestBody,
} from "../middleware/validateRequestBody.js";

const router = express.Router();

router.post("/", validateGetAllReqBody, getBooks); //get all. We converted GET into POST because it is easy for developer to 'send' & 'query' data from req.body rather than as a URL query parameters.

// router.get("/:id", getBook); //get one

router.post("/create", validateRequestBody, createBook); //add

router
 .route("/:id")
 .get(getBook)
 .put(validateRequestBody, updateBook)
 .delete(deleteBook); //With this approach, all three HTTP methods (GET, PUT, DELETE) are handled under the same route /:id, making your code more concise and organized.

// router.put("/:id", updateBook); //update

// router.delete("/:id", deleteBook); //delete

export default router;
