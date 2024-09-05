import express from "express";
import books from "./routes/books.js";
let port = process.env.PORT || 8000;

const app = express();

app.use(express.json()); //to send raw json data
// app.use(express.urlencoded({ extended: true })); //post request

app.use("/api/books", books); //Enter common path/route, enter filename

app.listen(port, () => {
  console.log(`server started running on ${port}`);
});

//
