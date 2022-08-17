const { selectTopics, selectArticle, selectUsers, patchArticle, selectArticles, selectArticleComments, postArticleComment } = require('../models/app.models')



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
    exports.getArticleComments = (req, res, next) => {
        selectArticleComments(req.params.article_id).then((comments) => {
            res.status(200).send({ comments: comments})
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
        selectArticles(req.query.sort_by, req.query.order, req.query.topic ).then((articles) => {
            res.status(200).send({ articles: articles})
        })
        }
        exports.postArticleComment = (req, res, next) => {
            postArticleComment(req.params.article_id, req.body).then((comment) => {
                res.status(201).send({ comment: comment}) 
            })
        .catch((err) => {console.log(err.code),  next(err);})
            }
    