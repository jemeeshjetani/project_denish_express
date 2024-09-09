# What is server?

In Express.js, the server refers to the Node.js application that listens for incoming HTTP requests and sends responses back to the client.
It is the backbone of your web application, handling the communication between the client (such as a browser or API consumer) and the server-side logic (such as routing, middleware, and database interactions(controllers) ).

## How to run the server?

#### 1. Express application:

import express from 'express';
//create express object
const app = express();

#### 2. Routing: A server in Express defines routes to handle specific HTTP requests (e.g., GET, POST, PUT, DELETE).

we can create a specific file to create diff. routes.
const router = express.Router()

router.get('/', (req, res) => {
res.send('Hello World');
});

All test cases:

1. get all books:
   /api/posts: filter()

2. get a book
   /i:id: find()
   if(!post): 404

3. add a book
   /create: .push()

4. update a book
   /api/posts:
   if(!posts): 404

5. delete a book
   /api/posts: splice: delete an element
   if(postIndex === -1): 404

6. Common error

-

#### 3. The server listens for incoming requests on a specific port. This is done using the listen() method.

- create port in .env file. PORT=8000

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});

#### 4. Middleware:

Middleware functions are pieces of code that the Express server executes when handling requests.
These could include things like logging, parsing request bodies, or authenticating users.

app.use(express.json());

#### 5. Controller(file): Handling Requests and Responses

The server receives a request, processes it (e.g., interacting with a database, applying business logic), and sends a response back to the client.
The req object represents the incoming request, and the res object represents the outgoing response.

const getBook = (req, res, next) => {
const books = [{ title: 'Book 1' }, { title: 'Book 2' }];
res.json(books); // Sends a JSON response
} ;

#### 6. PORT:

The server runs on a specific port, which is like a channel through which clients can communicate with your application.

Common development ports are 3000, 5000, and 8080, but you can configure any available port.

# How branch is managed?

master(production) | Development | fea1, fea2(staging)

# Genrating random ids using uuid:

What is uuid package?
To generate a random ID in an Express.js application,
you can use the uuid package, which is a good choice for generating unique identifiers.

Install the uuid package:
Terminal: npm install uuid

ES6: import { v4 as uuidv4 } from 'uuid';

- generate unique id using const "id = uuidv4()";  
  Note: It use function v4 as uuidv4().

# Genrate random data for database:

https://fakerjs.dev/

# Search, Filter, Pagination:

Features:

# add common URL/route in middlware

import router from './routes/books.js'; (import router )
app.use('/api/books', books); //Enter common path, enter filename

# Prettier Setup:

Yes - Install Prettier using npm. npm install --save-dev prettier

Yes - Create a .prettierrc file for custom configurations.

Optionally, add a .prettierignore file to exclude files or directories. - cancelled

Yes - Set up Prettier in your IDE (such as VSCode) for automatic formatting on save.

> Ctrl + Shift + P: Preferences: Open Settings (JSON): edit settings: set prettier as default

code:
"editor.wrappingIndent": "same", //Use these 2 for wrapping content atomatically
"editor.wordWrap": "on",

"editor.formatOnSave": true,
"[javascript]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},

"[html]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
}

Optionally, integrate Prettier with Git hooks for pre-commit formatting.

#### in .prettierrc file

{
"tabWidth": 2
}

# API Documentation

Tasks:  
Q: New Branch Name-Source use karvu - meeting ma samajvu

get books mate badha scenario lakhva -
grt book ma 404 throw karvi - running - done

update book. splice use karvi. je jarur chhe e j return karvu - done
