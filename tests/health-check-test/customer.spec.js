const request = require('supertest');
const { getAcessToken } = require('./request');

const API_URL = 'http://localhost:3000/api';

describe('(HealthCheck) List customers', () => {

    let token;

    beforeAll(async () => {
        token = await getAcessToken('admin', 'admin');
    });

    it ('Should list all customers', () => {
        request(API_URL)
            .get('/customers')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /json/)
    });
});
