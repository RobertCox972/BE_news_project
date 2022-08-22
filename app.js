const {
	getTopics,
	getArticleById,
	patchArticleVote,
	getUsers,
	getArticles,
	getArticleComments,
	postArticleComment,
	deleteArticleComment,
	getEndPoints,
} = require('./controllers/app.controllers');
const express = require('express');
const app = express();
app.use(express.json());
const format = require('pg-format');
const cors = require('cors');

app.use(cors());

app.get('/api/topics/', getTopics);

app.get('/api/', getEndPoints);

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/articles/:article_id/comments', getArticleComments);

app.get('/api/users', getUsers);

app.get('/api/articles', getArticles);

app.patch('/api/articles/:article_id', patchArticleVote);

app.post('/api/articles/:article_id/comments', postArticleComment);

app.delete('/api/comments/:comment_id', deleteArticleComment);

app.all('/*', (req, res) => {
	res.status(404).send({ msg: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
	// console.log(err.code);
	if (err.code === '22P02') {
		res.status(400).send({ msg: 'Bad Request' });
	}
	if (err.code === '23502' || err.code === '23503') {
		res.status(404).send({ msg: 'Not found' });
	}
	if (err.msg === 'Invalid sort_by query') {
		console.log('int the error handler');
		res.status(404).send({ msg: 'Not found' });
	} else {
		next(err);
	}
});
app.use((err, req, res, next) => {
	res.status(err.status).send({ msg: err.message });
});

module.exports = app;
