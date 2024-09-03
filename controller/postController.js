//cotroller work with the database

import { v4 as uuidv4 } from 'uuid';  //This imports the v4 method from the uuid package and renames it to uuidv4.

/*
const books = [
    { 'id': 1, 'title': 'First Book', 'rate': 49 },
    { 'id': 2, 'title': 'Second Book', 'rate': 61 },
    { 'id': 3, 'title': 'Third Book', 'rate': 451 }
]; */

const books = [
    { 'id': uuidv4(), 'title': 'First Book', 'rate': 49 },
    { 'id': uuidv4(), 'title': 'Second Book', 'rate': 61 },
    { 'id': uuidv4(), 'title': 'Third Book', 'rate': 451 }
];

const getBooks = (req, res, next) => {
    res.status(200).json(books);
}

const getBook = (req, res, next) => {
    //req id ne database na id sathe match karavvu
    // const id = parseInt(req.params.id);
    const id = req.params.id;   //because uuid are string based. 
    const book = books.find( (val) => val.id === id);

    res.status(200).json(book);
}

const createBook = (req, res, next) => {
    //add new book(new object) in the books array
    //fetch book title & rate from the body
    //console.log(req.body); 

    // Generate a unique ID for the book
    const bookId = uuidv4();



    const newBook = {
        //"id": books.length + 1,
        "id": bookId,
        "title": req.body.title,
        "rate": req.body.rate,
    }

    books.push(newBook);
    res.status(201).json(books);
}

const updateBook = (req, res, next) => {
    // const id = parseInt(req.params.id);
    const id = req.params.id;   //because uuid are string based. 
    const book = books.find((val) => val.id === id);

    book.title = req.body.title;
    book.rate = req.body.rate; 
    res.status(200).json(books);
}

const deleteBook = (req, res, next) => {
    //const id = parseInt(req.params.id);
    const id = req.params.id;   //because uuid are string based.
    const rBooks = books.filter( (val) => val.id != id );
    res.status(200).json(rBooks);

}

export { getBook, getBooks, createBook, updateBook, deleteBook };


