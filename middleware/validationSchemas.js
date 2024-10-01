//username: will be an object
// notEmpty: true OR notEmpty: { errorMessage: "Username cannot be empty"},

import { checkSchema } from "express-validator";

const validKeys1 = ["search", "minPrice", "maxPrice", "page", "limit"];

export const getAllPostsValidationSchema = {
 // "search" is optional and must be a string if provided
 search: {
  optional: true,
  isString: {
   errorMessage: "Search must be a string",
  },
 },

 // "minPrice" is optional and must be a float greater than or equal to 0
 minPrice: {
  optional: true,
  isFloat: {
   options: { min: 0 },
   errorMessage: "minPrice must be a number greater than or equal to 0",
  },
 },

 // "maxPrice" is optional and must be a float greater than or equal to 0
 maxPrice: {
  optional: true,
  isFloat: {
   options: { min: 0 },
   errorMessage: "maxPrice must be a number greater than or equal to 0",
  },
  // Custom validation to ensure maxPrice is greater than or equal to minPrice
  custom: {
   options: (value, { req }) => {
    if (
     value &&
     req.body.minPrice &&
     parseFloat(value) < parseFloat(req.body.minPrice)
    ) {
     throw new Error("maxPrice must be greater than or equal to minPrice");
    }
    return true;
   },
  },
 },

 // "page" is optional and must be an integer greater than or equal to 1
 page: {
  optional: true,
  isInt: {
   options: { min: 1 },
   errorMessage: "Page must be an integer greater than or equal to 1",
  },
 },

 // "limit" is optional and must be an integer greater than or equal to 1
 limit: {
  optional: true,
  isInt: {
   options: { min: 2 },
   errorMessage: "Limit must be an integer greater than or equal to 2",
  },
 },
};

export const validateCreateBookSchema = checkSchema({
 // Validate "title" (required and must be a string)
 title: {
  notEmpty: {
   errorMessage: "Title is required",
  },
  isString: {
   errorMessage: "Title must be a string",
  },
 },

 // Validate "rate" (required and must be a number)
 rate: {
  notEmpty: {
   errorMessage: "Rate is required",
  },
  isFloat: {
   errorMessage: "Rate must be a number",
  },
 },
});

export const validateUpdateBookSchema = checkSchema({
 // Either "title" or "rate" is required
 "*": {
  custom: {
   options: (value, { req }) => {
    if (!req.body.title && !req.body.rate) {
     throw new Error("Enter title or rate to update");
    }
    return true;
   },
  },
 },

 // Validate "title" (if provided, must be a string)
 title: {
  optional: true,
  isString: {
   errorMessage: "Title must be a string!",
  },
 },

 // Validate "rate" (if provided, must be a number)
 rate: {
  optional: true,
  isFloat: {
   errorMessage: "Rate must be a number!",
  },
 },
});
