import express from 'express';
import books from './routes/books.js';
let port = process.env.PORT || 8001;

const app = express();

app.use(books);

app.listen(port, () => {
    console.log(`server started running on ${port}`);
});

