import { gql } from "graphql-request";

export const query = gql`
  {
    products(first: 10) {
      edges {
        node {
          id
          descriptionHtml
          featuredImage {
            url
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
