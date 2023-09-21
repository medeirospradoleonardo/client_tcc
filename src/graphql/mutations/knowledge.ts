import { gql } from '@apollo/client'

export const MUTATION_DELETE_KNOWLEDGE = gql`
  mutation MutationDeleteKnowledge($id: ID!) {
    deleteKnowledge(id: $id) {
      data {
        id
      }
    }
  }
`
export const MUTATION_CREATE_KNOWLEDGE = gql`
  mutation MutationCreateKnowledge(
    $title: String!
    $content: String
    $categories: [ID]
    $authorId: ID!
  ) {
    createKnowledge(
      data: {
        title: $title
        content: $content
        categories: $categories
        author: $authorId
      }
    ) {
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

export const MUTATION_UPDATE_KNOWLEDGE = gql`
  mutation MutationUpdateKnowledge(
    $knowledgeId: ID!
    $title: String!
    $content: String
    $categories: [ID]
  ) {
    updateKnowledge(
      id: $knowledgeId
      data: { title: $title, content: $content, categories: $categories }
    ) {
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
