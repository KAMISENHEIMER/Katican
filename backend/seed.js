//helper to add books into the database, will alter later for adding entire books
//not part of actual server code

require('dotenv').config();
const { MongoClient } = require('mongodb');

const books = [
    { 
        title: "KadenTestBook1", 
        author: "kaden", 
        publisher: "katican", 
        isbn: "111", 
        status: "available", 
        checkedOutBy: null, 
        dueDate: null,
        description: "Test book",
        tags: ["Fantasy", "Comedy"]
    },
    { 
        title: "KadenTestBook2", 
        author: "kaden", 
        publisher: "katican", 
        isbn: "222", 
        status: "checked out", 
        checkedOutBy: 'kaden', 
        dueDate: new Date('2025-11-30'),
        description: "Test book currently checked out.",
        tags: ["Space"]
    },
    { 
        title: "KadenTestBook3", 
        author: "kaden", 
        publisher: "katican", 
        isbn: "333", 
        status: "available", 
        checkedOutBy: null, 
        dueDate: null,
        description: "Test book",
        tags: ["Heroes", "Adventure"]
    },
    { 
        title: "KadenTestBook4", 
        author: "kaden", 
        publisher: "katican", 
        isbn: "444", 
        status: "checked out", 
        checkedOutBy: 'kaden', 
        dueDate: new Date('2025-11-30'),
        description: "Test book",
        tags: ["Fantasy", "Tragedy"]
    },
    { 
        title: "KadenTestBook5", 
        author: "kaden", 
        publisher: "katican", 
        isbn: "555", 
        status: "available", 
        checkedOutBy: null, 
        dueDate: null,
        description: "Test book",
        tags: ["Space", "Poetry"]
    },
    { 
        title: "KadenTestBook6", 
        author: "kaden", 
        publisher: "katican", 
        isbn: "666", 
        status: "available", 
        checkedOutBy: null, 
        dueDate: null,
        description: "Test book",
        tags: ["Heroes", "Poetry"]
    },
    { 
        title: "KadenTestBook7", 
        author: "kaden", 
        publisher: "katican", 
        isbn: "777", 
        status: "checked out", 
        dueDate: new Date('2025-11-30'),
        checkedOutBy: 'kaden', 
        description: "Test book",
        tags: ["Fantasy", "Comedy"]
    },
    { 
        title: "KadenTestBook8", 
        author: "kaden", 
        publisher: "katican", 
        isbn: "888", 
        status: "checked out", 
        dueDate: new Date('2025-11-30'),
        checkedOutBy: 'kaden', 
        description: "Test book",
        tags: ["Space", "Adventure"]
    },
    { 
        title: "KadenTestBook9", 
        author: "kaden", 
        publisher: "katican", 
        isbn: "999", 
        status: "checked out", 
        dueDate: new Date('2025-11-30'),
        checkedOutBy: 'kaden', 
        description: "Test book",
        tags: ["Heroes", "Adventure"]
    },
    { 
        title: "KadenTestBook10", 
        author: "kaden", 
        publisher: "katican", 
        isbn: "1010", 
        status: "available", 
        checkedOutBy: null, 
        dueDate: null,
        description: "Test book",
        tags: ["Fantasy", "Adventure"]
    },
    
];

async function seedDB() {
    const client = new MongoClient(process.env.MONGO_URI);
    try {
        await client.connect();
        const collection = client.db('library').collection('books');
        
        //clear existing data, REMOVE THIS once adding real books
        await collection.deleteMany({});
        console.log("Cleared existing books.");

        //add new books
        await collection.insertMany(books);
        console.log("Inserted 10 starter books!");

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

seedDB();