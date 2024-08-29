let books = [
    { 'id': 1, 'title': 'First Book', 'rate': 49 },
    { 'id': 2, 'title': 'Second Book', 'rate': 61 },
    { 'id': 3, 'title': 'Third Book', 'rate': 451 }
];

const getBooks = (req, res, next) => {
    res.status(200).json(books);
}

const getBook = (req, res, next) => {

}

const createBook = (req, res, next) => {

}

const updateBook = (req, res, next) => {

}

const deleteBook = (req, res, next) => {

}

export { getBook, getBooks, createBook, updateBook, deleteBook };


