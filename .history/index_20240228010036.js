const express = require("express")
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors')
const db = require("./data/db.json")

app.use(cors())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gfg0jvx.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

app.get("/quizzes", (req, res) => {
    res.send(db)
})

app.get("/", (req, res) => {
    res.send("quiz server is running")
})

app.listen(port, () => {
    console.log("quiz server is running on port", port)
})