import { gql } from '@apollo/client'

export const QUERY_GET_KNOWLEDGES = gql`
  query QueryGetKnowledges {
    knowledges {
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
