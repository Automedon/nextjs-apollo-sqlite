import gql from "graphql-tag";

export const ALL_USERS_QUERY = gql`
  query {
    allUsers {
      user
      users {
        id
        email
        password
      }
    }
  }
`;
