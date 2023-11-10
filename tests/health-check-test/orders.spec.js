const request = require('supertest');
const { getAcessToken } = require('./request');

const API_URL = 'http://localhost:3000/api';

describe('(HealthCheck) List orders', () => {

    let token;

    beforeAll(async () => {
        token = await getAcessToken('admin', 'admin');
    });

    it ('Should list all orders', () => {
        request(API_URL)
            .get('/orders')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /json/)
    });
});
