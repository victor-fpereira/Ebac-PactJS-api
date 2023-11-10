const request = require('supertest');


const API_URL = 'http://localhost:3000/api';

let getAcessToken = (user, password) => {

    return request(API_URL)
        .post('/login')
        .send({
            "username": user,
            "password": password
        })
        .set('Accept', 'application/json')
        .then(response => {
            return 'Bearer ' + response.body.accessToken;
        })
}

module.exports = { getAcessToken }
