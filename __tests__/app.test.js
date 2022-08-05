const app = require("../app.js");
const db = require("../db/connection");
const request = require("supertest");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/");
const { expect } = require("@jest/globals");

beforeEach(() => {
    return seed(testData);
})

   
   afterAll(() => { db.end()});



   describe('Returns 404 for unknown endpoint', () => {
test('Returns 404', () => {
    return request(app)
    .get('/test')
    .expect(404)
})
   })


describe('GET api/topics', () => {
test('returns the desired status code and array object ', () => {
return request(app)
.get('/api/topics/')
.expect(200)
.then(({ body: {topics} }) => {
    expect(topics).toBeInstanceOf(Array)
        expect(topics).toHaveLength(3);
    topics.forEach((topic) => {
        expect(typeof topic.slug).toBe('string')
        expect(typeof topic.description).toBe('string')
    })
   
})
})
})
describe('GET users', () => {
    test('returns the desired status code and array of objects ', () => {
    return request(app)
    .get('/api/users/')
    .expect(200)
    .then(({ body: {users} }) => {
        expect(users).toBeInstanceOf(Array)
        users.forEach((user) => {
            expect(user).toBeInstanceOf(Object)
            expect(typeof user.username).toBe('string')
            expect(typeof user.name).toBe('string')
            expect(typeof user.avatar_url).toBe('string')

        })
    })
    })
    })
describe('GET article by id', () => {
    test('returns status 404 when id not found ', () => {
        return request(app)
        .get('/api/articles/99')
        .expect(404)
       })
       test('returns status 400 when given invalid id ', () => {
        return request(app)
        .get('/api/articles/test')
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe('Bad Request');
        })
       })
    test('returns the desired article information', () => {
    return request(app)
    .get('/api/articles/1')
    .expect(200)
    .then(({ body: {articles} }) => {
        expect(articles).toBeInstanceOf(Object)
        expect(articles.author).toBe('butter_bridge')
        expect(articles.title).toBe('Living in the shadow of a great man')
        expect(articles.article_id).toBe(1)
        expect(articles.body).toBe('I find this existence challenging')
        expect(articles.topic).toBe('mitch')
        expect(articles.created_at).toBe('2020-07-09T20:11:00.000Z')
        expect(articles.votes).toBe(100)
        expect(articles.comment_count).toBe(11)
        
        
      
    })
})
       
            describe('PATCH inc_votes by ID', () => {
                test('returns status 404 when id not found ', () => {
                    return request(app)
                    .patch('/api/articles/99')
                    .expect(404)
                   })
                
                test('returns status 400 when given invalid id ', () => {
                    return request(app)
                    .patch('/api/articles/test')
                    .expect(400)
                    .then(({ body }) => {
                        expect(body.msg).toBe('Bad Request');
                    })
                })
                    test('returns status 400 when given invalid vote increment ', () => {
                        return request(app)
                        .patch('/api/articles/1')
                        .send({inc_votes : 'test'})
                        .expect(400)
                        .then(({ body }) => {
                            expect(body.msg).toBe('Bad Request');
                        })
                   })
            test('Increments the vote by the given inc_votes ', () => {
                return request(app)
                .patch('/api/articles/1')
                .send({inc_votes : 18})
                .expect(201)
                .then(({ body: {article}}) => {
                    expect(article).toBeInstanceOf(Object)
                    expect(article.article_id).toBe(1)
                    expect(article.votes).toBe(118)
                })
               })
            })
        })
        describe('GET articles', () => {
            test('returns the desired status code and array object properties ', () => {
            return request(app)
            .get('/api/articles/')
            .expect(200)
            .then(({ body: {articles} }) => {
                expect(articles).toBeInstanceOf(Array)
                expect(articles.length).toBe(12)
                articles.forEach((article) => {
                    expect(article).toBeInstanceOf(Object)
                    expect(typeof article.author).toBe('string')
                    expect(typeof article.title).toBe('string')
                    expect(typeof article.article_id).toBe('number')
                    expect(typeof article.body).toBe('string')
                    expect(typeof article.topic).toBe('string')
                    expect(typeof article.created_at).toBe('string')
                    expect(typeof article.votes).toBe('number')
                    expect(typeof article.comment_count).toBe('number')
                })
                expect(articles).toBeSortedBy('created_at', {
                    descending: true
                  });
            })
            })
            })
            describe('GET article comments', () => {
                   test('returns status 400 when given invalid id ', () => {
                    return request(app)
                    .get('/api/articles/test/comments')
                    .expect(400)
                    .then(({ body }) => {
                        expect(body.msg).toBe('Bad Request');
                    })
                   })
                   test('returns status 200 and an empty array when an article has no comments ', () => {
                    return request(app)
                    .get('/api/articles/999/comments')
                    .expect(200)
                    .then(({ body: {comments} }) => {
                        expect(comments).toEqual([]);
                    })
                   })
                test('returns the desired status code and array object properties ', () => {
                return request(app)
                .get('/api/articles/3/comments')
                .expect(200)
                .then(({ body: {comments} }) => {
                    expect(comments).toBeInstanceOf(Array)
                    expect(comments.length).toBe(2)
                    comments.forEach((comment) => {
                        expect(comment).toBeInstanceOf(Object)
                        expect(typeof comment.comment_id).toBe('number')
                        expect(typeof comment.votes).toBe('number')
                        expect(typeof comment.created_at).toBe('string')
                        expect(typeof comment.author).toBe('string')
                        expect(typeof comment.body).toBe('string')
                    })
                })
                })
                })
                describe('POST article comments', () => {
                    test('returns status 400 when given invalid id ', () => {
                     return request(app)
                     .post('/api/articles/test/comments')
                     .expect(400)
                     .then(({ body }) => {
                         expect(body.msg).toBe('Bad Request');
                     })
                    })
                    test('returns status 400 and an empty array when the given id is not found ', () => {
                        return request(app)
                        .post('/api/articles/99/comments')
                        .expect(400)
                       })
                 test('returns the desired status code and array object properties ', () => {
                 return request(app)
                 .post('/api/articles/3/comments')
                 .send({username : 'butter_bridge', body : 'Body of sample text?!! 1 + 2'})
                 .expect(201)
                 .then(({ body: {comment} }) => {
                     expect(comment).toBeInstanceOf(Array)
                     expect(comment.length).toBe(1)
                     comment.forEach((comment) => {
                         expect(comment).toBeInstanceOf(Object)
                         expect(typeof comment.comment_id).toBe('number')
                         expect(typeof comment.votes).toBe('number')
                         expect(typeof comment.created_at).toBe('string')
                         expect(typeof comment.author).toBe('string')
                         expect(typeof comment.body).toBe('string')
                     })
                 })
                 })
                 })
                 
       

