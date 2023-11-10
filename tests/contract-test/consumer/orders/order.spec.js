const path = require('path');
const { fetchUsers } = require('./order');
const { PactV3, MatchersV3 } = require('@pact-foundation/pact');

const {
    eachLike
} = MatchersV3;

const provider = new PactV3({
    dir: path.resolve(process.cwd(), 'pacts'),
    consumer: 'OrderConsumer',
    provider: 'OrderProvider',
});

const EXPECTED_BODY = {
    "data": {
        "items": [
            {
                "address": {
                    "id": "clorxnsdy0000qmyccd5kckyr",
                    "__typename": "Address"
                },
                "createdAt": "2023-11-10T01:23:20.553Z",
                "email": "vpereira@email.com",
                "firstName": "Victor",
                "id": "clorxoyg80002qmyctowu2me8",
                "lastName": "Pereira",
                "orders": [
                    {
                        "id": "clorxq87u0006qmyclc8n2h5o",
                        "__typename": "Order"
                    }
                ],
                "phone": "(00) 9090-8980",
                "updatedAt": "2023-11-10T01:23:20.553Z",
                "__typename": "Customer"
            }
        ],
        "total": {
            "count": "1",
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
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjk5NTcwOTc1LCJleHAiOjE2OTk3NDM3NzV9.4gGyGO7Yx38Ws-kfICPCZCGePTgA3ok5tKUJ6nrui1E',
                        'Content-Type': 'application/json',
                    },
                    body: {
                        "operationName": "customers",
                        "variables": {
                          "where": {
                            "id": {
                              "in": [
                                "clorxoyg80002qmyctowu2me8"
                              ]
                            }
                          }
                        },
                        "query": "query customers($where: CustomerWhereInput) {\n  items: customers(where: $where) {\n    address {\n      id\n      __typename\n    }\n    createdAt\n    email\n    firstName\n    id\n    lastName\n    orders {\n      id\n      __typename\n    }\n    phone\n    updatedAt\n    __typename\n  }\n  total: _customersMeta(where: $where) {\n    count\n    __typename\n  }\n}\n"
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
