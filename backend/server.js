//Express Server (will be hosted on Render)

require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();

//middleware
app.use(express.json());
app.use(cors({ origin: '*' })); // Allow React to talk to this

//database variables
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let booksCollection; //store current collection

//try to connect to DB and start server
async function startServer() {
    try {
        await client.connect();
        // console.log("Connected to MongoDB Atlas");

        const db = client.db('library'); 
        booksCollection = db.collection('books');

        //listen after DB connects
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    }
}
startServer();

// EXPRESS ROUTES
//list all books
app.get('/books', async (req, res) => {
    try {
        const now = new Date();

        //auto return any overdue books
        await booksCollection.updateMany(
            { 
                status: 'checked out', 
                dueDate: { $lt: now } 
            },
            { 
                $set: { 
                    status: 'available', 
                    checkedOutBy: null, 
                    dueDate: null 
                } 
            }
        );

        //fetch list of books (except content)
        const books = await booksCollection.find({})
            .project({ content: 0 }) 
            .toArray();

        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//get all info about a book (including content)
app.get('/books/:id', async (req, res) => {
    try {
        const bookId = req.params.id;

        const book = await booksCollection.findOne({ _id: new ObjectId(bookId) });
        
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//list available books
app.get('/books/available', async (req, res) => {
    try {
        const books = await booksCollection.find({ status: 'available' }).toArray();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//list checked-out books
app.get('/books/checked-out', async (req, res) => {
    try {
        const books = await booksCollection.find({ status: 'checked out' }).toArray();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//check-out book
app.patch('/checkout', async (req, res) => {
    const { bookId, userName } = req.body; 

    //ensure id and username exist in request
    if (!bookId || !userName) {
        return res.status(400).json({ error: "bookId and userName are required" });
    }

    try {
        const dueDate = new Date();
        dueDate.setMinutes(dueDate.getMinutes() + 30); //due in 30 mins

        const result = await booksCollection.updateOne(
            { _id: new ObjectId(bookId) }, //convert string to ObjectId for mongoDB
            { 
                $set: { 
                    status: 'checked out',
                    checkedOutBy: userName,
                    dueDate: dueDate
                } 
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Book not found" });
        }
        
        res.json({ message: "Book checked out successfully", dueDate });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//check-in book
app.patch('/checkin', async (req, res) => {
    const { bookId } = req.body;

    try {
        const result = await booksCollection.updateOne(
            { _id: new ObjectId(bookId) },
            { 
                $set: { 
                    status: 'available',
                    checkedOutBy: null,
                    dueDate: null
                } 
            }
        );

        res.json({ message: "Book checked in successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});