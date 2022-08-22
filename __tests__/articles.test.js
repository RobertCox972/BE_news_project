const app = require("../app.js");
const db = require("../db/connection");
const request = require("supertest");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/");
const { expect } = require("@jest/globals");

beforeEach(() => {
	return seed(testData);
});

afterAll(() => {
	db.end();
});

describe("GET articles", () => {
	test("returns the desired status code and array object properties ", () => {
		return request(app)
			.get("/api/articles/")
			.expect(200)
			.then(({ body: { articles } }) => {
				expect(articles).toBeInstanceOf(Array);
				expect(articles.length).toBe(12);
				articles.forEach((article) => {
					expect(article).toBeInstanceOf(Object);
					expect(typeof article.author).toBe("string");
					expect(typeof article.title).toBe("string");
					expect(typeof article.article_id).toBe("number");
					expect(typeof article.body).toBe("string");
					expect(typeof article.topic).toBe("string");
					expect(typeof article.created_at).toBe("string");
					expect(typeof article.votes).toBe("number");
					expect(typeof article.comment_count).toBe("number");
				});
				expect(articles).toBeSortedBy("created_at", {
					descending: true,
				});
			});
	});
	test("returns 404 for invalid sort_by request ", () => {
		return request(app).get("/api/articles/?sort_by=test").expect(400);
	});

	test("returns ordered by the sort_by given ", () => {
		return request(app)
			.get("/api/articles/?sort_by=author")
			.expect(200)
			.then(({ body: { articles } }) => {
				expect(articles).toBeInstanceOf(Array);
				expect(articles).toBeSortedBy("author", {
					descending: true,
				});
			});
	});
	test("returns 404 for invalid sort_by request ", () => {
		return request(app).get("/api/articles/?order=cat").expect(400);
	});

	test("returns ordered by the ORDER given ", () => {
		return request(app)
			.get("/api/articles?sort_by=author&order=asc")
			.expect(200)
			.then(({ body: { articles } }) => {
				expect(articles).toBeInstanceOf(Array);
				expect(articles).toBeSortedBy("author", {
					Ascending: true,
				});
			});
	});
	test("returns the result filtered by a given topic ", () => {
		return request(app)
			.get("/api/articles?topic=mitch&sort_by=votes&order=asc")
			.expect(200)
			.then(({ body: { articles } }) => {
				expect(articles).toBeInstanceOf(Array);
				expect(articles).toBeSortedBy("votes", {
					Ascending: true,
				});
			});
	});
});
describe("GET article by id", () => {
	test("returns status 404 when id not found ", () => {
		return request(app).get("/api/articles/99").expect(404);
	});
	test("returns status 400 when given invalid id ", () => {
		return request(app)
			.get("/api/articles/test")
			.expect(400)
			.then(({ body }) => {
				expect(body.msg).toBe("Bad Request");
			});
	});
	test("returns the desired article information", () => {
		return request(app)
			.get("/api/articles/1")
			.expect(200)
			.then(({ body: { articles } }) => {
				expect(articles).toBeInstanceOf(Object);
				expect(articles.author).toBe("butter_bridge");
				expect(articles.title).toBe("Living in the shadow of a great man");
				expect(articles.article_id).toBe(1);
				expect(articles.body).toBe("I find this existence challenging");
				expect(articles.topic).toBe("mitch");
				expect(articles.created_at).toBe("2020-07-09T20:11:00.000Z");
				expect(articles.votes).toBe(100);
				expect(articles.comment_count).toBe(11);
			});
	});
});
