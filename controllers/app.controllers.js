const {
	selectTopics,
	selectArticleComments,
	postArticleComment,
	deleteCommentById,
} = require('../models/app.models');
const {
	selectArticle,
	patchArticle,
	selectArticles,
} = require('../models/articles.models');
const { selectUsers } = require('../models/users.models');

exports.getTopics = (req, res) => {
	selectTopics().then((topics) => {
		res.status(200).send({ topics: topics });
	});
};
exports.getUsers = (req, res) => {
	selectUsers().then((users) => {
		res.status(200).send({ users: users });
	});
};
exports.getArticleById = (req, res, next) => {
	selectArticle(req.params.article_id)
		.then((articles) => {
			res.status(200).send({ articles: articles });
		})
		.catch((err) => {
			next(err);
		});
};
exports.getArticleComments = (req, res, next) => {
	selectArticleComments(req.params.article_id)
		.then((comments) => {
			res.status(200).send({ comments: comments });
		})
		.catch((err) => {
			next(err);
		});
};
exports.deleteArticleComment = (req, res, next) => {
	deleteCommentById(req.params.comment_id)
		.then((comments) => {
			res.status(204).send({ status: 204 });
		})
		.catch((err) => {
			next(err);
		});
};
exports.patchArticleVote = (req, res, next) => {
	patchArticle(req.params.article_id, req.body)
		.then((article) => {
			res.status(201).send({ article });
		})
		.catch((err) => {
			next(err);
		});
};

exports.getArticles = (req, res, next) => {
	selectArticles(req.query)
		.then((articles) => {
			res.status(200).send({ articles: articles });
		})
		.catch((err) => {
			next(err);
		});
};

exports.postArticleComment = (req, res, next) => {
	postArticleComment(req.params.article_id, req.body)
		.then((comment) => {
			res.status(201).send({ comment: comment });
		})
		.catch((err) => {
			next(err);
		});
};
const getEndPoints = require('../endpoints.json');

exports.getEndPoints = (req, res) => {
	res.send(endpoints);
};
