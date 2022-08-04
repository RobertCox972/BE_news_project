const { selectTopics, selectArticle, selectUsers, patchArticle, selectArticles } = require('../models/app.models')



exports.getTopics = (req, res) => {
selectTopics().then((topics) => {
    res.status(200).send({ topics: topics})
})
}
exports.getUsers = (req, res) => {
    selectUsers().then((users) => {
        res.status(200).send({ users: users})
    })
    }
exports.getArticleById = (req, res, next) => {
    selectArticle(req.params.article_id).then((articles) => {
        res.status(200).send({ articles: articles})
    })
.catch((err) => { next(err);})
    }
    exports.patchArticleVote = (req, res, next) => {

    patchArticle(req.params.article_id, req.body).then((article) => {

            res.status(201).send({article})
        })
        .catch((err) => { next(err);})
    }
    exports.getArticles = (req, res) => {
        selectArticles().then((articles) => {
            res.status(200).send({ articles: articles})
        })
        }
    