import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
  mutation AUTHENTICATE($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;
