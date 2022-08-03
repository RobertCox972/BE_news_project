const { getTopics, getArticleById, patchArticleVote } = require("./controllers/app.controllers")
const express = require("express");
const app = express();
app.use(express.json());
 


app.get("/api/topics/", getTopics)

app.get("/api/articles/:article_id", getArticleById)

app.patch("/api/articles/:article_id", patchArticleVote)


app.all("/*", (req, res) => {
    res.status(404)
    .send({ msg: "Endpoint not found"})
})

app.use((err, req, res, next) => {
    if (err.code === '22P02' || err.code === '23502') {
        res.status(400).send({msg: 'Bad Request'})
    }
    else 
{
    next(err)
    }
});
app.use((err, req, res, next) => {
    res.status(err.status).send({msg: err.message})
})


module.exports = app;