# What is server?

In Express.js, the server refers to the Node.js application that listens for incoming HTTP requests and sends responses back to the client.
It is the backbone of your web application, handling the communication between the client (such as a browser or API consumer) and the server-side logic (such as routing, middleware, and database interactions(controllers) ).

### How to run the server?

Creating express application:
Create express() object.

The server runs on a specific port, which is like a channel through which clients can communicate with your application.
Common development ports are 3000, 5000, and 8080, but you can configure any available port.

```http
import express from 'express';
const PORT = process.env.PORT || 8000;

const app = express();
```

The server listens for incoming requests on a specific port. This is done using the listen() method.

```http
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
```

#### 2. Routing: A server in Express defines routes to handle specific HTTP requests (e.g., GET, POST, PUT, DELETE).

We can create a specific file to create diff. routes.

```http
const router = express.Router()

router.get('/', (req, res) => {
res.send('Hello World');
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

```http
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

```http
app.use(express.json());
```

books.js router handler

```http
import router from './routes/books.js'; (import router )
app.use("/api/books", books);
```

###### 5. Controller(file): Handling Requests and Responses

The server receives a request, processes it (e.g., interacting with a database, applying business logic), and sends a response back to the client.
The req object represents the incoming request, and the res object represents the outgoing response.

```http
const getBook = (req, res, next) => {
const books = [{ title: 'Book 1' }, { title: 'Book 2' }];
res.json(books); // Sends a JSON response
} ;
```

# How branch is managed?

master(production) | Development | fea1, fea2(staging)

# Generating random ids using uuid:

What is uuid package?
To generate a random ID in an Express.js application,
you can use the uuid package, which is a good choice for generating unique identifiers.

Install the uuid package:

```http
Terminal: npm install uuid
```

Generate unique id using uuid ES6 module:

```http
import { v4 as uuidv4 } from 'uuid';

const id = uuidv4();
```

Note: It use function v4 as uuidv4().

# Genrate random data for database:

https://fakerjs.dev/

# Search, Filter, Pagination:

Features:

# Prettier Setup:

Yes - Install Prettier using npm.

```http
npm install --save-dev prettier
```

Yes - Create a .prettierrc file for custom configurations.

Optionally, add a .prettierignore file to exclude files or directories. - Not used

Yes - Set up Prettier in your IDE (such as VSCode) for automatic formatting on save.

```http
Ctrl + Shift + P: Preferences: Open Settings (JSON): edit settings: set prettier as default
```

```http
"editor.wrappingIndent": "same", //Use these 2 for wrapping content atomatically
"editor.wordWrap": "on",

"editor.formatOnSave": true,
"[javascript]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},

"[html]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

Optionally, integrate Prettier with Git hooks for pre-commit formatting.

#### in .prettierrc file

```http
{
"tabWidth": 2
}
```

# API Documentation

Tasks:
Q: New Branch Name-Source use karvu - meeting ma samajvu
