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
app.listen(port, () => {
    console.log("Moon Tech Server is running")
})