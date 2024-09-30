# What is server?

In Express.js, the server refers to the Node.js application that listens for incoming HTTP requests and sends responses back to the client.
It is the backbone of your web application, handling the communication between the client (such as a browser or API consumer) and the server-side logic (such as routing, middleware, and database interactions(controllers) ).

### How to run the server?

Creating express application:
Create express() object.

The server runs on a specific port, which is like a channel through which clients can communicate with your application.
Common development ports are 3000, 5000, and 8080, but you can configure any available port.

```js
import express from "express";
const PORT = process.env.PORT || 8000;

const app = express();
```

The server listens for incoming requests on a specific port. This is done using the listen() method.

```js
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});
```

#### 2. Routing: A server in Express defines routes to handle specific HTTP requests (e.g., GET, POST, PUT, DELETE).

We can create a specific file to create diff. routes.

```js
const router = express.Router();

router.get("/", (req, res) => {
 res.send("Hello World");
});
```

#### All test cases/scenario:

###### 1. POST /api/books get all books:

(We have converted GET into POST)

**Scenario 1:** Fetch all books.

**Scenario 2:** Test pagination (limit and page req.body elements).

**Scenario 3:** Search by title

**Scenario 4:** Filter by price range (minPrice, maxPrice).

###### 2. GET /api/books/:id get book by id

**Scenario 1:** Fetch an existing book by ID.

**Scenario 2:** Test with an invalid ID or non-existent ID (should return 404).

###### 3. POST /api/books/create create a new book

**Scenario 1:** Create a book with valid data.

**Scenario 2:** Test with missing title or rate (should return 400 Bad Request).

**Scenario 3:** Test with invalid data type for rate (e.g., a string instead of a number).

###### 4. PUT /api/books/ update existing post

**Scenario 1:** Update an existing book.

**Scenario 2:** Test with an invalid or non-existent book ID (should return 404).

**Scenario 3:** Test with invalid data (e.g., no title or rate, title not a string, rate not a number).

###### 5. DELETE /api/books/ delete a post

**Scenario 1:** Delete a book that exists.

**Scenario 2:** Test with an invalid or non-existent book ID (should return 404).

###### 6. Catch-all route for Not found 404, middleware

```js
app.use(notFound);

const notFound = (req, res, next) => {
 res.status(404).json({
  message: "not found",
  error: `The requested resource ${req.originalUrl} was not found on this server.`,
 });
};
```

###### 4. Middleware:

Middleware functions are pieces of code that the Express server executes when handling requests.

These could include things like logging, parsing request bodies, or authenticating users.

To send raw json data

```js
app.use(express.json());
```

books.js router handler

```js
import router from './routes/books.js'; (import router )
app.use("/api/books", books);
```

###### 5. Controller(file): Handling Requests and Responses

The server receives a request, processes it (e.g., interacting with a database, applying business logic), and sends a response back to the client.
The req object represents the incoming request, and the res object represents the outgoing response.

```js
const getBook = (req, res, next) => {
 const books = [{ title: "Book 1" }, { title: "Book 2" }];
 res.json(books); // Sends a JSON response
};
```

# How branch is managed?

master(production) | Development | fea1, fea2(staging)

feat/one -> develop -> master
feat/two

develop

- feat/one
- feat/two

# Generating random ids using uuid:

What is uuid package?
To generate a random ID in an Express.js application,
you can use the uuid package, which is a good choice for generating unique identifiers.

Install the uuid package(Terminal):

```js
npm install uuid
```

Generate unique id using uuid ES6 module:

```js
import { v4 as uuidv4 } from "uuid";

const id = uuidv4();
```

Note: It use function v4 as uuidv4().

# Genrate random data for database:

Install Faker.js:

```js
npm install @faker-js/faker
```

```js
import { faker } from "@faker-js/faker";

// Function to generate a random book
const generateBook = () => {
 return {
  id: faker.string.uuid(),
  title: faker.lorem.words(),
  author: faker.person.fullName(),
  publishedDate: faker.date.past().toISOString().split("T")[0],
  price: faker.commerce.price(),
  rating: faker.number.float({ min: 0, max: 5, multipleOf: 0.1 }),
 };
};
```

ref: (https://fakerjs.dev/)

# Search(keyword), Filter(minPrice, maxPrice), Pagination(page, limit):

- Define req.body with default values.

**Search(keyword)**

```js
const { search = " ", minPrice, maxPrice, page = 1, limit = 2 } = req.body;

let filteresBooks = books.filter( (val) => {
   val.title.toLowerCase().includes(search.toLowerCase()),
})
```

**Filter(minPrice, maxPrice)**
//Filter by price range logic

```js
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
```

**Pagination(Page, limit)**

```js
const startIndex = (page - 1) _ limit; //this logic counts start & end index
const endIndex = page _ limit;

const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

**Result page**
res.status(200).json({
totalCount: filteredBooks.length,
currentPage: page,
perPage: limit,
books: paginatedBooks,
});
```

# Prettier Setup:

###### Install Prettier using npm.

```js
npm install --save-dev prettier
```

###### Create a .prettierrc(prettier configuration) file for custom configurations.

```js
{
  "tabWidth": 1,  //  //for 1 it will leaves 2 spaces
}
```

###### [Optional] add a .prettierignore file to exclude files or directories.

###### Ctrl + Shift + P: Preferences: Open Settings (JSON): edit settings: set prettier as default

Set up Prettier in your IDE (such as VSCode) for automatic formatting on save.

settings.json:

```js
// "editor.wrappingIndent": "same",  Use these 2 for wrapping content atomatically
"editor.wordWrap": "on",

"editor.formatOnSave": true,

"[javascript]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},

"[html]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

###### Optionally, integrate Prettier with Git hooks for pre-commit formatting.
