const db = require("../db/connection.js")

exports.selectTopics = () => {
    return db 
    .query("SELECT * FROM topics;")
    .then(({ rows: topics }) => {
        return topics;
    })
}
exports.selectArticle  = (article_id) => {
    return db 
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({ rows: articles }) => {
        if (articles.length < 1){
     
            return Promise.reject({status: 404})
        }
        return articles;
    })
}


exports.patchArticle  = (article_id, voteChange) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({ rows: articles}) => {
        if (articles.length < 1){
     return Promise.reject({status: 404})
        }
            return db
            .query(`UPDATE articles SET votes = votes + $2 WHERE article_id = $1 returning *;`, [article_id, voteChange.inc_votes])
            .then(({ rows }) => {
        return rows;
            })
    })
}