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
