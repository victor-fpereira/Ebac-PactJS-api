const path = require('path');
const { fetchCustomers } = require('./customer');
const { PactV3, MatchersV3 } = require('@pact-foundation/pact');

const {
    eachLike
} = MatchersV3;

const provider = new PactV3({
    dir: path.resolve(process.cwd(), 'pacts'),
    consumer: 'CustomerConsumer',
    provider: 'CustomerProvider',
});

const EXPECTED_BODY = {
    "data": {
        "items": [
            {
                "address_1": "Rua do Limoeiro",
                "address_2": null,
                "city": "São Paulo",
                "createdAt": "2023-11-10T01:22:26.038Z",
                "customers": [
                    {
                        "id": "clorxoyg80002qmyctowu2me8",
                        "__typename": "Customer"
                    }
                ],
                "id": "clorxnsdy0000qmyccd5kckyr",
                "state": "São Paulo",
                "updatedAt": "2023-11-10T01:22:26.038Z",
                "zip": 14320123,
                "__typename": "Address"
            }
        ],
        "total": {
            "count": "1",
            "__typename": "MetaQueryPayload"
        }
    }
};

describe('Users Service', () => {
    describe('When a POST request is made to /customers', () => {
        test('it should return all customers', async () => {
            provider
                .uponReceiving('a request to all customers')
                .withRequest({
                    method: 'POST',
                    path: '/graphql',
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjk5NTcwOTc1LCJleHAiOjE2OTk3NDM3NzV9.4gGyGO7Yx38Ws-kfICPCZCGePTgA3ok5tKUJ6nrui1E',
                        'Content-Type': 'application/json',
                    },
                    body: {
                        "operationName": "addresses",
                        "variables": {
                            "where": {
                                "id": {
                                    "in": [
                                        "clorxnsdy0000qmyccd5kckyr"
                                    ]
                                }
                            }
                        },
                        "query": "query addresses($where: AddressWhereInput) {\n  items: addresses(where: $where) {\n    address_1\n    address_2\n    city\n    createdAt\n    customers {\n      id\n      __typename\n    }\n    id\n    state\n    updatedAt\n    zip\n    __typename\n  }\n  total: _addressesMeta(where: $where) {\n    count\n    __typename\n  }\n}\n"
                    },
                })
                .willRespondWith({
                    status: 200,
                    body: eachLike(EXPECTED_BODY),
                });

            await provider.executeTest(async mockProvider => {
                const requestContent = await fetchCustomers(mockProvider.url);
                expect(requestContent[0]).toEqual(EXPECTED_BODY);
            });
        });
    });
});
