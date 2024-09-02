//cotroller work with the database

const books = [
    { 'id': 1, 'title': 'First Book', 'rate': 49 },
    { 'id': 2, 'title': 'Second Book', 'rate': 61 },
    { 'id': 3, 'title': 'Third Book', 'rate': 451 }
];

const getBooks = (req, res, next) => {
    res.status(200).json(books);
}

const getBook = (req, res, next) => {
    //req id ne database na id sathe match karavvu
    const id = parseInt(req.params.id);
    const book = books.find( (val) => val.id === id);

    res.status(200).json(book);
}

const createBook = (req, res, next) => {
    //add new book(new object) in the books array
    //fetch book title & rate from the body
    //console.log(req.body); 
    const newBook = {
        "id": books.length + 1,
        "title": req.body.title,
        "rate": req.body.rate,
    }

    books.push(newBook);
    res.status(201).json(books);
}

const updateBook = (req, res, next) => {
    const id = parseInt(req.params.id);
    const book = books.find((val) => val.id === id);

    book.title = req.body.title;
    book.rate = req.body.rate; 
    res.status(200).json(books);
}

const deleteBook = (req, res, next) => {
    const id = parseInt(req.params.id);
    const rBooks = books.filter( (val) => val.id != id );
    res.status(200).json(rBooks);

}

export { getBook, getBooks, createBook, updateBook, deleteBook };


