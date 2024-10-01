//cotroller works with the database

import { v4 as uuidv4 } from "uuid"; //This imports the v4 method from the uuid package and renames it to uuidv4.
import { booksArray } from "./booksdata.js";
import { faker } from "@faker-js/faker";
import { validationResult } from "express-validator";

/*
const books = [
    { 'id': 1, 'title': 'First Book', 'rate': 49 },
    { 'id': 2, 'title': 'Second Book', 'rate': 61 },
    { 'id': 3, 'title': 'Third Book', 'rate': 451 }
]; */

let books = [
 { id: uuidv4(), title: "First Book", rate: 49 },
 { id: uuidv4(), title: "Second Book", rate: 61 },
 { id: uuidv4(), title: "Third Book", rate: 451 },
];

books = books.concat(booksArray);

const getBooks = (req, res, next) => {
 // Search, Filter, Pagination logic

 const errors = validationResult(req);
 console.log(errors);

 if (!errors.isEmpty()) {
  return response.status(400).send({ error: errors.array() }); //this prints on browser/device.
 }

 let { search = "", minPrice, maxPrice, page = 1, limit = 2 } = req.body; //req.query; The req.query object parses these parameters
 //so they can be easily accessed in your Express application.

 //if (books == []) {
 // res.status(404).json("No book found!");
 //}

 let filteredBooks = books;

 // let filteredBooks;

 //Filter by search term (case-sensitive check)
 //This works for title only.
 search = search.trim();
 if (search) {
  // This means the user entered a valid non-empty string
  filteredBooks = books.filter((val) =>
   val.title.toLowerCase().includes(search.toLowerCase()),
  );
 }

 //Filter by price range logic

 if (minPrice && maxPrice) {
  filteredBooks = filteredBooks.filter(
   (val) =>
    val.rate >= parseFloat(minPrice) && val.rate <= parseFloat(maxPrice),
  ); //parseInt(): convert string into Integer
 } else if (minPrice) {
  filteredBooks = filteredBooks.filter(
   (val) => val.rate >= parseFloat(minPrice),
  );
 } else if (maxPrice) {
  filteredBooks = filteredBooks.filter(
   (val) => val.rate <= parseFloat(maxPrice),
  );
 }
 //use filteredBooks till here to count filtetered books

 //Pagination logic
 //const limit = req.body.limit;

 const startIndex = (page - 1) * limit; //this logic counts start & end index
 //for the requested page(1,2,3,4...)
 const endIndex = page * limit;

 const paginatedBooks = filteredBooks.slice(startIndex, endIndex); //books on the requested page
 //search, minPrice, maxPrice na hoy tyare root array jaruri chhe.

 res.status(200).json({
  Count: filteredBooks.length,
  Page: page,
  Limit: limit,
  Books: paginatedBooks,
 });
};
//404 nahi ave.
// res.status(200).json(books);

const getBook = (req, res, next) => {
 /* if (Object.keys(req.body).length > 0) {
  return res.status(400).json({
   error: "Request body should be empty when fetching a requested record",
  });
 }
 */
 //req id ne database na id sathe match karavvu
 // const id = parseInt(req.params.id);
 const id = req.params.id;

 const book = books.find((val) => val.id === id);

 if (!book) {
  res.status(404).json({ error: `Book with id ${id} is not found` });
 }

 res.status(200).json(book);
};

const createBook = (req, res, next) => {
 //add new book(new object) in the books array
 //fetch book title & rate from the body
 //console.log(req.body);

 // Check if both title and rate are provided and if title is a valid string & rate is a valid number
 /*if (
  !req.body.title ||
  typeof req.body.title !== "string" ||
  !req.body.rate ||
  typeof req.body.rate !== "number"
 ) {
  return res.status(400).json({
   error:
    "Invalid input. Please provide a valid title (string) and rate (number).",
  });
 }
*/
 // Generate a unique ID for the book
 // const bookId = uuidv4();

 //"id": books.length + 1,

 const errors = validationResult(req);
 console.log(errors);

 if (!errors.isEmpty()) {
  return res.status(400).send({ error: errors.array() }); //this prints on browser/device.
 }

 const newBook = {
  id: faker.string.uuid(),
  title: req.body.title.trim(),
  rate: req.body.rate,
 };

 books.push(newBook);
 res.status(201).json(newBook);
};

const updateBook = (req, res, next) => {
 const errors = validationResult(req);
 console.log(errors);

 if (!errors.isEmpty()) {
  res.status(400).send({ error: errors.array() });
 }

 // const id = parseInt(req.params.id);  convert string into integer
 const id = req.params.id; //because uuid are string based.
 const bookIndex = books.findIndex((val) => val.id === id);

 if (bookIndex === -1) {
  return res.status(404).json({ error: `Book with id ${id} is not found!` });
 }

 //if(!req.body.title || !req.body.rate) {
 //	book.title =
 //}

 // Update only if title and rate are provided in the body

 /*
 if (!req.body.title && !req.body.rate) {
  res.status(404).json({ error: `Enter title or rate to update` });
 }

 if (req.body.title && typeof req.body.title !== "string") {
  res.status(404).json({ error: `Title must be a string!` });
 }

 if (req.body.rate && typeof req.body.rate !== "number") {
  res.status(404).json({ error: `Rate must be a number!` });
 }
*/
 /*
 if (req.body.title) {
  book.title = req.body.title;
 }

 if (req.body.rate) {
  book.rate = req.body.rate;
 } */

 // Update the book's title if it's provided, otherwise keep the existing title
 if (req.body.title) {
  // && typeof req.body.title === "string")
  booksArray[bookIndex].title = req.body.title;
 }

 // Update the book's rate if it's provided, otherwise keep the existing rate
 if (req.body.rate) {
  // && typeof req.body.rate === "number")
  booksArray[bookIndex].rate = req.body.rate;
 }

 res.status(200).json(booksArray[bookIndex]);
};

const deleteBook = (req, res, next) => {
 //const id = parseInt(req.params.id);
 const id = req.params.id; //Get the book id from request params
 const bookIndex = books.findIndex((val) => val.id === id); // Find the index of the book

 if (bookIndex === -1) {
  return res.status(404).json({ error: `Book with id ${id} is not found!` });
 }

 //remove the book from the array
 const deletedBook = books.splice(bookIndex, 1); //Use splice() to delete the book from the array

 //const rBooks = books.filter((val) => val.id != id);

 res.status(200).json({
  message: "Book succesfully deleted",
  deletedBook: deletedBook[0],
 });
};

export { getBooks, getBook, createBook, updateBook, deleteBook };
