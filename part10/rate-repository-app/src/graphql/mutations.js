import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
  mutation AUTHENTICATE($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CREATE_REVIEW($review: CreateReviewInput) {
    createReview(review: $review) {
      repositoryId
    }
  }
`;

export const CREATE_USER = gql`
  mutation Mutation($user: CreateUserInput) {
    createUser(user: $user) {
      id
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DELETE_REVIEW($id: ID!) {
    deleteReview(id: $id)
  }
`;
