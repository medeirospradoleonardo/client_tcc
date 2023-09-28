import { gql } from '@apollo/client'

export const QUERY_GET_KNOWLEDGES = gql`
  query QueryGetKnowledges(
    $categories: [ID]
    $page: Int
    $pageSize: Int!
    $sort: [String]
    $title: String
  ) {
    knowledges(
      sort: $sort
      filters: {
        categories: { id: { in: $categories } }
        title: { containsi: $title }
      }
      pagination: { page: $page, pageSize: $pageSize }
    ) {
      data {
        id
        attributes {
          title
          author {
            data {
              id
              attributes {
                username
              }
            }
          }
          categories {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`
export const QUERY_GET_KNOWLEDGES_TOTAL = gql`
  query QueryGetKnowledgesTotal($categories: [ID], $title: String) {
    knowledges(
      filters: {
        categories: { id: { in: $categories } }
        title: { containsi: $title }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
  }
`

export const QUERY_GET_KNOWLEDGE = gql`
  query QueryGetKnowledge($id: ID!) {
    knowledge(id: $id) {
      data {
        id
        attributes {
          title
          content
          author {
            data {
              id
              attributes {
                username
              }
            }
          }
          usersCanEdit(filters: { type: { eqi: "default" } }) {
            data {
              id
              attributes {
                username
              }
            }
          }
          categories {
            data {
              id
              attributes {
                name
              }
            }
          }
          stories {
            data {
              attributes {
                author
                date
              }
            }
          }
        }
      }
    }
  }
`
