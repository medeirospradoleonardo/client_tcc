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
    $authorId: ID!
    $usersCanEdit: [ID]
    $categories: [ID]
  ) {
    createKnowledge(
      data: {
        title: $title
        content: $content
        author: $authorId
        usersCanEdit: $usersCanEdit
        categories: $categories
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
        }
      }
    }
  }
`

export const MUTATION_UPDATE_KNOWLEDGE = gql`
  mutation MutationUpdateKnowledge(
    $knowledgeId: ID!
    $title: String
    $content: String
    $usersCanEdit: [ID]
    $categories: [ID]
  ) {
    updateKnowledge(
      id: $knowledgeId
      data: {
        title: $title
        content: $content
        usersCanEdit: $usersCanEdit
        categories: $categories
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
        }
      }
    }
  }
`
