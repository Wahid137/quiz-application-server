const express = require("express")
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors')
require("dotenv").config()
const { MongoClient, ServerApiVersion } = require('mongodb');

//middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gfg0jvx.mongodb.net/?retryWrites=true&w=majority`;// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const usersCollection = client.db("quizDb").collection("users");
        const quizCollection = client.db("quizDb").collection("quizzes");
        const marksCollection = client.db("quizDb").collection("marks");

        app.get('/quizzes', async (req, res) => {
            const result = await quizCollection.find().toArray();
            res.send(result);
        })



        //store users information from sign up page
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result)
        })

        //store users information from sign up page
        app.post('/marks', async (req, res) => {
            const mark = req.body;
            const result = await marksCollection.insertOne(mark);
            res.send(result)
        })

        //get store product by email address
        app.get('/dashboard/scoreboard', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const result = await marksCollection.find(query).toArray()

            res.send(result)
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("quiz server is running")
})

app.listen(port, () => {
    console.log("quiz server is running on port", port)
})