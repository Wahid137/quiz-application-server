const express = require("express")
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors')
const db = require("./data/db.json")

app.use(cors())

app.get("/quizzes", (req, res) => {
    res.send(db)
})

app.get("/chefs/:id", (req, res) => {
    const id = Number(req.params.id);
    const selectedChef = db.find((item) => Number(item.id) === id)
    res.send(selectedChef)
})


app.get("/", (req, res) => {
    res.send("chef server is running")
})

app.listen(port, () => {
    console.log("chef server is running on port", port)
})