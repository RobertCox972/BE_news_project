const { getTopics, getArticlesById } = require("./controllers/app.controllers")
const express = require("express");
const app = express();
 


app.get("/api/topics/", getTopics)


app.all("/*", (req, res) => {
    res.status(404)
    .send({ msg: "Endpoint not found"})
})


module.exports = app;