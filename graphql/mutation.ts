import gql from "graphql-tag";

export const REGISTER_USER_MUTATION = gql`
  mutation($email: String, $password: String) {
    register(email: $email, password: $password)
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation($email: String, $password: String) {
    login(email: $email, password: $password)
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation($email: String) {
    deleteUser(email: $email)
  }
`;

export const DELETE_COOKIES_MUTATION = gql`
  mutation {
    deleteCookies
  }
`;
