//helper to add books into the database, will alter later for adding entire books
//not part of actual server code

require('dotenv').config();
const { MongoClient } = require('mongodb');

const books = [
    { title: "KadenTestBook1", author: "kaden", publisher: "katican", isbn: "111", status: "available", checkedOutBy: null, dueDate: null },
    { title: "KadenTestBook2", author: "kaden", publisher: "katican", isbn: "222", status: "checked out", checkedOutBy: 'kaden', dueDate: '11/30/25' }
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