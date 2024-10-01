//defines endpoints

import express from "express";
import {
 getAllPostsValidationSchema,
 validateCreateBookSchema,
 validateUpdateBookSchema,
} from "../middleware/validationSchemas.js";
import { checkSchema } from "express-validator";
import {
 getBooks,
 getBook,
 createBook,
 updateBook,
 deleteBook,
} from "../controller/bookController.js";
import {
 isEmptyRequestBody,
 validateGetAllReqBody,
 validatePutRequestBody,
} from "../middleware/validationScripts.js";

const router = express.Router();

router.post(
 "/",
 validateGetAllReqBody,
 checkSchema(getAllPostsValidationSchema),
 getBooks,
); //get all. We converted GET into POST because it is easy for developer to 'send' & 'query' data from req.body rather than as a URL query parameters.

// router.get("/:id", getBook); //get one

router.post("/create", validateCreateBookSchema, createBook); //add

router
 .route("/:id")
 .get(isEmptyRequestBody, getBook)
 .put(validatePutRequestBody, validateUpdateBookSchema, updateBook)
 .delete(isEmptyRequestBody, deleteBook); //With this approach, all three HTTP methods (GET, PUT, DELETE) are handled under the same route /:id, making your code more concise and organized.

// router.put("/:id", updateBook); //update

// router.delete("/:id", deleteBook); //delete

export default router;
