const axios = require('axios');

const data = {
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
}

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjk4Njk4MzI1LCJleHAiOjE2OTg4NzExMjV9.bKD0vRYhUCCOlleczKjgrl1EXPqvQ4ZyHmEOkUJaR34"

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
