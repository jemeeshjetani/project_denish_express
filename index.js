import express from "express";
import books from "./routes/books.js";
import notFound from "./middleware/notfound.js";
let port = process.env.PORT || 8000;

const app = express();
//use this hierarchy for below middlewares.

//The first middleware parses the incoming request body if it's in JSON format and attaches it to req.body.
app.use(express.json()); //to send raw json data
// app.use(express.urlencoded({ extended: true })); post request

app.use("/api/books", books); //books.js router handler

app.use(notFound);

app.listen(port, () => {
 console.log(`server started running on ${port}`);
});

//In summary, middlewares and routes are processed in the order they are defined in the code. The app.use() method attaches the middleware globally, and Express works its way down the list of middlewares for each request until it finds a match or reaches the 404 handler.
