const axios = require('axios');

const data = {
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
}

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjk5NTcwOTc1LCJleHAiOjE2OTk3NDM3NzV9.4gGyGO7Yx38Ws-kfICPCZCGePTgA3ok5tKUJ6nrui1E"

const fetchUsers = async (url) => {

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
  fetchUsers
};
