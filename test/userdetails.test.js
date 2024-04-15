
const { app, server } = require("../app.js");
const supertest = require("supertest");
const request = supertest(app);
const sequelize = require('../connection.js');
const { logger } = require('../winston-log/winston');
const User = require('../model/User.js');

beforeAll(async () => {
    await sequelize.authenticate();
});

afterAll((done) => {
    server.close(done);
});

describe('/v1/user/self endpoint', () => {
    const getUserEndpoint = '/v8/user/self';
    const getPostUserEndpoint = '/v8/user';
    const basicAuthUsername = 'testuser@gmail.com';
    const basicAuthPassword = 'password';
    let authToken = Buffer.from(`${basicAuthUsername}:${basicAuthPassword}`).toString('base64');;

    test('Test 1 - GET /v8/user/self - Validate account exists', async () => {
        const user = await request.post(getPostUserEndpoint)
            .send({
                first_name: 'John',
                last_name: 'Doe',
                email: basicAuthUsername,
                password: basicAuthPassword,
                isTest: true
            });

        await User.update({ account_verified: true }, {
            where: { username: basicAuthUsername }
        });
        const response = await request.get(getUserEndpoint)
            .set('Authorization', `Basic ${authToken}`)
            .expect(200);

        expect(response.body.username).toBe('testuser@gmail.com');
        expect(response.body.first_name).toBe('John');
        expect(response.body.last_name).toBe('Doe');
        logger.warn('Entries in the database need to deleted after the test');
    });

    test('Test 2 - PUT /v8/user/self - Validate account was updated', async () => {
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
        logger.warn('Entries in the database need to deleted after the test');
    });
});
