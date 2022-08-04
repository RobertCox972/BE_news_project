const db = require("../db/connection.js")

exports.selectTopics = () => {
    return db 
    .query("SELECT * FROM topics;")
    .then(({ rows: topics }) => {
        return topics;
    })
}
exports.selectUsers = () => {
    return db 
    .query("SELECT * FROM users;")
    .then(({ rows: users }) => {
        return users;
    })
}
exports.selectArticle  = (article_id) => {
    return db 
    .query(`SELECT COUNT (*)::int AS comment_count, articles.author, articles.title,
     articles.article_id, articles.body, articles.topic, articles.created_at, articles.votes 
     FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1 GROUP BY articles.article_id ORDER BY articles.article_id;`, [article_id])
    .then(({ rows: [articles] }) => {
    
        if (articles === undefined){
     
            return Promise.reject({status: 404})
        }

        return articles
    })
}
exports.selectCommentCount  = (article_id) => {
    return db 
    .query(`SELECT COUNT(comment_id)
    FROM comments
    WHERE article_id = $1`, [article_id])
    .then(({ rows: [articles] }) => {
        if (articles === undefined){
     
            return Promise.reject({status: 404})
        }

        return articles
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
            .then(({ rows: [rows] }) => {
                
        return rows;
            })
    })
}