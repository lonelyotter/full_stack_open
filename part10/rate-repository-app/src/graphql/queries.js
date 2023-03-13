import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Query(
    $after: String
    $first: Int
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      after: $after
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
    }
  }
`;

export const GET_ME = gql`
  query GET_ME($includeReviews: Boolean = false) {
    me {
      username
      id
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            rating
            repository {
              fullName
              id
            }
            createdAt
            text
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Query($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ownerAvatarUrl
      fullName
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;
