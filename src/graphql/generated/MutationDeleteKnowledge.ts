/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MutationDeleteKnowledge
// ====================================================

export interface MutationDeleteKnowledge_deleteKnowledge_data {
  __typename: "KnowledgeEntity";
  id: string | null;
}

export interface MutationDeleteKnowledge_deleteKnowledge {
  __typename: "KnowledgeEntityResponse";
  data: MutationDeleteKnowledge_deleteKnowledge_data | null;
}

export interface MutationDeleteKnowledge {
  deleteKnowledge: MutationDeleteKnowledge_deleteKnowledge | null;
}

export interface MutationDeleteKnowledgeVariables {
  id: string;
}
