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
    WHERE articles.article_id = $1 GROUP BY articles.article_id;`, [article_id])
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

exports.selectArticles  = (sort) => {

    return db 
    .query(`SELECT COUNT (*)::int AS comment_count, articles.author, articles.title,
    articles.article_id, articles.body, articles.topic, articles.created_at, articles.votes 
    FROM articles
   LEFT JOIN comments
   ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC;`)
    .then(({ rows: articles }) => {
        if (articles < 1){
     
            return Promise.reject({status: 404})
        }

        return articles
    })
}
exports.selectArticleComments  = (article_id) => {
    return db 
    .query(`SELECT * FROM comments WHERE article_id = $1;`, [article_id])
    .then(({ rows: comments }) => {

        return comments
    })
}
exports.postArticleComment  = (article_id, comment) => {

    if (comment.body === undefined || comment.username === undefined)
     {

        return Promise.reject({status: 400})
     }
    return db 
    .query(`INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) returning *;`, [article_id, comment.username, comment.body])
    .then(({ rows: comment }) => {
        

        return comment
    
})
}