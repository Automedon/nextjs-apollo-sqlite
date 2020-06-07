const { gql } = require("apollo-server-micro");

export const typeDefs = gql`
  type User {
    id: ID
    email: String
    password: String
  }
  input UserInput {
    email: String
    password: String
  }
  type ResponseUsers {
    users: [User]
    user: String
  }
  type Query {
    hello: User
    allUsers: ResponseUsers
  }
  type Mutation {
    register(email: String, password: String): Boolean
    login(email: String, password: String): Boolean
    deleteUser(email: String): Boolean
    deleteCookies: Boolean
  }
`;
