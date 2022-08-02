const { selectTopics, selectArticle } = require('../models/app.models')



exports.getTopics = (req, res) => {
selectTopics().then((topics) => {
    res.status(200).send({ topics: topics})
})
}
exports.getArticleById = (req, res, next) => {
    selectArticle(req.params.article_id).then((articles) => {
        res.status(200).send({ articles: articles})
    })
.catch((err) => { next(err);})
    }
