//generating rendom books data

import { faker } from '@faker-js/faker';    //faker object

// Function to generate a random book
const generateBook = () => {
    return {
        id: faker.string.uuid(),
        title: faker.lorem.words(),
        author: faker.person.fullName(),
        publishedDate: faker.date.past().toISOString().split('T')[0],
        price: faker.commerce.price(),
        rating: faker.number.float({ min: 0, max: 5, multipleOf: 0.1 })
    };
};

// Generate an array of 50 random books
const generateBooks = (numBooks = 50) => {
    const books = [];
    for (let i = 0; i < numBooks; i++) {
        books.push(generateBook());
    }
    return books;
};

// Generate and log the books array
const booksArray = generateBooks();
console.log(booksArray);
