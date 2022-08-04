const app = require("../app.js");
const db = require("../db/connection");
const request = require("supertest");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/")

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
        
       

