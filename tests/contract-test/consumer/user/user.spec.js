const path = require('path');
const { fetchUsers } = require('./user');
const { PactV3, MatchersV3 } = require('@pact-foundation/pact');

const {
    eachLike
} = MatchersV3;

const provider = new PactV3({
    dir: path.resolve(process.cwd(), 'pacts'),
    consumer: 'UserConsumer',
    provider: 'UserProvider',
});

const EXPECTED_BODY = {
    "data": {
        "items": [
            {
                "createdAt": "2023-11-01T22:23:24.072Z",
                "firstName": "Admin",
                "id": "clogbqqi00000qmf4qbv94udy",
                "lastName": "User",
                "roles": [
                    "user"
                ],
                "updatedAt": "2023-11-01T22:23:24.191Z",
                "username": "admin",
                "__typename": "User"
            },
            {
                "createdAt": "2023-11-03T00:12:24.483Z",
                "firstName": "Victor",
                "id": "clohv2rs30000qmv00qjzp9ym",
                "lastName": "Pereira",
                "roles": [
                    "user"
                ],
                "updatedAt": "2023-11-03T00:12:24.483Z",
                "username": "vpereira",
                "__typename": "User"
            }
        ],
        "total": {
            "count": "2",
            "__typename": "MetaQueryPayload"
        }
    }
};

describe('Users Service', () => {
    describe('When a POST request is made to /users', () => {
        test('it should return all users', async () => {
            provider
                .uponReceiving('a request to all users')
                .withRequest({
                    method: 'POST',
                    path: '/graphql',
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjk4Njk4MzI1LCJleHAiOjE2OTg4NzExMjV9.bKD0vRYhUCCOlleczKjgrl1EXPqvQ4ZyHmEOkUJaR34',
                        'Content-Type': 'application/json',
                    },
                    body: {
                        "operationName": "users",
                        "variables": {
                            "where": {},
                            "take": 50,
                            "skip": 0,
                            "orderBy": {
                                "id": "Asc"
                            }
                        },
                        "query": "query users($orderBy: UserOrderByInput, $skip: Float, $take: Float, $where: UserWhereInput) {\n  items: users(orderBy: $orderBy, skip: $skip, take: $take, where: $where) {\n    createdAt\n    firstName\n    id\n    lastName\n    roles\n    updatedAt\n    username\n    __typename\n  }\n  total: _usersMeta(where: $where) {\n    count\n    __typename\n  }\n}\n"
                    },
                })
                .willRespondWith({
                    status: 200,
                    body: eachLike(EXPECTED_BODY),
                });

            await provider.executeTest(async mockProvider => {
                const requestContent = await fetchUsers(mockProvider.url);
                expect(requestContent[0]).toEqual(EXPECTED_BODY);
            });
        });
    });
});
