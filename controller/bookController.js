//cotroller work with the database

import { v4 as uuidv4 } from "uuid"; //This imports the v4 method from the uuid package and renames it to uuidv4.

/*
const books = [
    { 'id': 1, 'title': 'First Book', 'rate': 49 },
    { 'id': 2, 'title': 'Second Book', 'rate': 61 },
    { 'id': 3, 'title': 'Third Book', 'rate': 451 }
]; */

const books = [
	{ id: uuidv4(), title: "First Book", rate: 49 },
	{ id: uuidv4(), title: "Second Book", rate: 61 },
	{ id: uuidv4(), title: "Third Book", rate: 451 },
];

const getBooks = (req, res, next) => {
	// Pagination, Search, and Filter logic

	const { search = "", minPrice, maxPrice, page = 1, limit = 2 } = req.body; //req.query; The req.query object parses these parameters
	//so they can be easily accessed in your Express application.

	if (books == []) {
		res.status(404).json("No book found!");
	}

	//Filter by search term (case-sensitive check)
	let filteredBooks = books.filter((val) =>
		val.title.toLowerCase().includes(search.toLowerCase()),
	);

	//Filter by price range logic
	if (minPrice) {
		filteredBooks = filteredBooks.filter(
			(val) => val.rate >= parseFloat(minPrice),
		);
	}

	if (maxPrice) {
		filteredBooks = filteredBooks.filter(
			(val) => val.rate <= parseFloat(maxPrice),
		);
	}

	//Pagination logic
	//const limit = req.body.limit;

	const startIndex = (page - 1) * limit; //this logic counts start & end index
	//for the requested page(1,2,3,4...)
	const endIndex = page * limit;

	const paginatedBooks = filteredBooks.slice(startIndex, endIndex); //books on the requested page

	res.status(200).json({
		totalCount: filteredBooks.length,
		currentPage: page,
		perPage: limit,
		books: paginatedBooks,
	});
};
//404 nahi ave.
// res.status(200).json(books);

const getBook = (req, res, next) => {
	//req id ne database na id sathe match karavvu
	// const id = parseInt(req.params.id);
	const id = req.params.id;

	const book = books.find((val) => val.id === id);

	if (!book) {
		res.status(404).json({ message: `Book with id ${id} is not found` });
	}

	res.status(200).json(book);
};

const createBook = (req, res, next) => {
	//add new book(new object) in the books array
	//fetch book title & rate from the body
	//console.log(req.body);

	// Check if both title and rate are provided and if title is a valid string & rate is a valid number
	if (
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

	// Generate a unique ID for the book
	const bookId = uuidv4();

	//"id": books.length + 1,
	const newBook = {
		id: bookId,
		title: req.body.title,
		rate: req.body.rate,
	};

	books.push(newBook);
	res.status(201).json(newBook);
};

const updateBook = (req, res, next) => {
	// const id = parseInt(req.params.id);
	const id = req.params.id; //because uuid are string based.
	const book = books.find((val) => val.id === id);

	if (!book) {
		return res
			.status(404)
			.json({ message: `Book with id ${id} is not found!` });
	}

	book.title = req.body.title;
	book.rate = req.body.rate;
	res.status(200).json(book);
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
