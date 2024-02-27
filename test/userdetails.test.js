
const { app, server } = require("../app.js");
const supertest = require("supertest");
const request = supertest(app);
const sequelize = require('../connection.js');

beforeAll(async() => {
    await sequelize.sync();
});

afterAll((done) => {
    server.close(done);
});

describe('/v1/user/self endpoint', () => {
    const getUserEndpoint = '/v1/user/self';
    const getPostUserEndpoint = '/v1/user';
    const basicAuthUsername = 'testuser@gmail.com';
    const basicAuthPassword = 'password';
    let authToken = Buffer.from(`${basicAuthUsername}:${basicAuthPassword}`).toString('base64');;

    test('Test 1 - GET /v1/user/self - Validate account exists', async () => {
        const user = await request.post(getPostUserEndpoint)
            .send({
                first_name: 'John',
                last_name: 'Doe',
                email: basicAuthUsername,
                password: basicAuthPassword,
            });

        const response = await request.get(getUserEndpoint)
            .set('Authorization', `Basic ${authToken}`)
            .expect(200);

        expect(response.body.username).toBe('testuser@gmail.com');
        expect(response.body.first_name).toBe('John');
        expect(response.body.last_name).toBe('Doe');
    });

    test('Test 2 - PUT /v1/user/self - Validate account was updated', async () => {
        const updateResponse = await request.put(getUserEndpoint)
            .send({
                first_name: 'UpdatedJohn',
                last_name: 'UpdatedDoe',
                password: basicAuthPassword,
            })
            .set('Authorization', `Basic ${authToken}`)
            .expect(204);

        const getResponse = await request.get(getUserEndpoint)
            .set('Authorization', `Basic ${authToken}`)
            .expect(200);

        expect(getResponse.body.username).toBe('testuser@gmail.com');
        expect(getResponse.body.first_name).toBe('UpdatedJohn');
        expect(getResponse.body.last_name).toBe('UpdatedDoe');
    });
});
