const axios = require('axios');

const data = {
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
}

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjk5NTcwOTc1LCJleHAiOjE2OTk3NDM3NzV9.4gGyGO7Yx38Ws-kfICPCZCGePTgA3ok5tKUJ6nrui1E"

const fetchCustomers = async (url) => {

  console.log('url', url);

  const response = await axios
    .post(`${url}/graphql`, data,
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      })
    .then((res) => res.data)
    .catch((err) => err.response);

  return response;

};

module.exports = {
  fetchCustomers
};
