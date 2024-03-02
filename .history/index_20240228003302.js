const express = require("express")
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors')
const db = require("./data/db.json")

app.use(cors())

app.get("/quizzes", (req, res) => {
    res.send(db)
})

app.get("/", (req, res) => {
    res.send("quiz server is running")
})

app.listen(port, () => {
    console.log("quiz server is running on port", port)
})