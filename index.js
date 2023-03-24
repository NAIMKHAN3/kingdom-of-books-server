const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json())


app.get('/', (req, res) => {
    res.send({ status: true, Message: 'Moon Tech Server is Running' })
})
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ujhfrio.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const booksCollections = client.db("kingdom-books").collection("books")
        try {
            app.get('/books', async (req, res) => {
                const result = await booksCollections.find({}).toArray();
                res.send(result)
            })
        }
        catch {
            res.send({ status: false, message: "Products Not Found" })
        }
        try {
            app.post('/addbook', async (req, res) => {
                const product = req.body;
                const result = await booksCollections.insertOne(product);
                res.send(result)
            })
        }
        catch {
            res.send({ status: false, message: 'Product Not Insert' })
        }

    }
    catch {
        res.send({ status: false, Message: "Server Is Down" })
    }

}
run().catch(e => console.log(e))



app.listen(port, () => {
    console.log("Moon Tech Server is running")
})