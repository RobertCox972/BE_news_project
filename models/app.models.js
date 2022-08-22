const db = require('../db/connection.js');

exports.selectTopics = () => {
	return db.query('SELECT * FROM topics;').then(({ rows: topics }) => {
		return topics;
	});
};

exports.selectArticleComments = (article_id) => {
	return db
		.query(`SELECT * FROM comments WHERE article_id = $1;`, [article_id])
		.then(({ rows: comments }) => {
			console.log(comments);
			return comments;
		});
};
exports.deleteCommentById = (comment_id) => {
	return db
		.query(`DELETE FROM comments WHERE comment_id = $1 returning *;`, [
			comment_id,
		])
		.then(({ rows }) => {
			if (rows.length < 1) {
				return Promise.reject({ status: 404 });
			}

			return rows;
		});
};
exports.postArticleComment = (article_id, comment) => {
	if (comment.body === undefined || comment.username === undefined) {
		return Promise.reject({ status: 400 });
	}
	return db
		.query(
			`INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) returning *;`,
			[article_id, comment.username, comment.body]
		)
		.then(({ rows: comment }) => {
			return comment;
		});
};
