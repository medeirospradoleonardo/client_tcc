import { gql } from '@apollo/client'

export const QUERY_GET_CATEGORIES = gql`
  query QueryGetCategories {
    categories(sort: "name:asc") {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`
