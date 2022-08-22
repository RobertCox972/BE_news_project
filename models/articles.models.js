const db = require("../db/connection.js");
exports.selectArticles = (sort) => {
	const dbArray = [];
	const validSort_By = [
		"author",
		"title",
		"article_id",
		"topic",
		"created_at",
		"votes",
		"comment_count",
	];
	const validOrder = ["asc", "desc"];
	let dbQuery =
		"SELECT articles.*, COUNT (comments.article_id) ::INT AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id";
	if (sort.topic) {
		dbArray.push(sort.topic);
		dbQuery += ` WHERE topic = $1`;
	}
	dbQuery += " GROUP BY articles.article_id";
	if (sort.sort_by) {
		if (!validSort_By.includes(sort.sort_by)) {
			return Promise.reject({ status: 400, msg: "Not a valid sort_by" });
		} else {
			dbQuery += ` ORDER BY ${sort.sort_by}`;
		}
	} else {
		dbQuery += ` ORDER BY created_at`;
	}
	if (sort.order) {
		if (!validOrder.includes(sort.order)) {
			return Promise.reject({ status: 400, msg: "Not a valid order" });
		} else {
			dbQuery += ` ${sort.order.toUpperCase()};`;
		}
	} else {
		dbQuery += ` desc;`;
	}
	return db.query(dbQuery, dbArray).then(({ rows: articles }) => {
		return articles;
	});
};
exports.patchArticle = (article_id, voteChange) => {
	return db
		.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
		.then(({ rows: articles }) => {
			if (articles.length < 1) {
				return Promise.reject({ status: 404 });
			}
			return db
				.query(
					`UPDATE articles SET votes = votes + $2 WHERE article_id = $1 returning *;`,
					[article_id, voteChange.inc_votes]
				)
				.then(({ rows: [rows] }) => {
					return rows;
				});
		});
};
exports.selectArticle = (article_id) => {
	return db
		.query(
			`SELECT COUNT (*)::int AS comment_count, articles.author, articles.title,
     articles.article_id, articles.body, articles.topic, articles.created_at, articles.votes 
     FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1 GROUP BY articles.article_id;`,
			[article_id]
		)
		.then(({ rows: [articles] }) => {
			if (articles === undefined) {
				return Promise.reject({ status: 404 });
			}

			return articles;
		});
};
