//helper to add books into the database
//not part of actual server code

require('dotenv').config();
const { MongoClient } = require('mongodb');

const books = [
    { 
        title: "The End", 
        author: "Micah S.", 
        publisher: "Katican", 
        isbn: "3ND", 
        status: "available", 
        checkedOutBy: null, 
        dueDate: null,
        description: "The End",
        tags: ["Fantasy",],
        content: "For it was in those ancient days that the end came. After the creatures of chaos had sung every song and told every story. After they had climbed their way to the stars and beyond. When the last war had ended, not by some work of grace nor diplomacy- but because there was no one left to fight. And once the last star in all the galaxies of the universe faded to darkness, then The End was born. <br><br> The End then saw the footprints of every being big and small. It heard all the echoes of the most desperate cry and the happiest laughter. And after it had beheld every moment of every living thing. From the smallest microorganism to the largest of the deep creatures of legend. After taking in existence itself and pondering it forever and ever. Then and only then did it speak.",
    },
    
];

async function seedDB() {
    const client = new MongoClient(process.env.MONGO_URI);
    try {
        await client.connect();
        const collection = client.db('library').collection('books');
        
        //add new book(s)
        await collection.insertMany(books);
        console.log("Inserted book!");

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

seedDB();