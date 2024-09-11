import express from "express";
import books from "./routes/books.js";
import notFound from "./middleware/notfound.js";
let port = process.env.PORT || 8000;

const app = express();
//use this hierarchy for below middlewares.

app.use(express.json()); //to send raw json data
// app.use(express.urlencoded({ extended: true })); post request

app.use("/api/books", books); //books.js router handler

app.use(notFound);

app.listen(port, () => {
 console.log(`server started running on ${port}`);
});

//
