/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MutationUpdateKnowledge
// ====================================================

export interface MutationUpdateKnowledge_updateKnowledge_data_attributes_author_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface MutationUpdateKnowledge_updateKnowledge_data_attributes_author_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: MutationUpdateKnowledge_updateKnowledge_data_attributes_author_data_attributes | null;
}

export interface MutationUpdateKnowledge_updateKnowledge_data_attributes_author {
  __typename: "UsersPermissionsUserEntityResponse";
  data: MutationUpdateKnowledge_updateKnowledge_data_attributes_author_data | null;
}

export interface MutationUpdateKnowledge_updateKnowledge_data_attributes_categories_data_attributes {
  __typename: "Category";
  name: string;
}

export interface MutationUpdateKnowledge_updateKnowledge_data_attributes_categories_data {
  __typename: "CategoryEntity";
  id: string | null;
  attributes: MutationUpdateKnowledge_updateKnowledge_data_attributes_categories_data_attributes | null;
}

export interface MutationUpdateKnowledge_updateKnowledge_data_attributes_categories {
  __typename: "CategoryRelationResponseCollection";
  data: MutationUpdateKnowledge_updateKnowledge_data_attributes_categories_data[];
}

export interface MutationUpdateKnowledge_updateKnowledge_data_attributes {
  __typename: "Knowledge";
  title: string;
  content: string;
  author: MutationUpdateKnowledge_updateKnowledge_data_attributes_author | null;
  categories: MutationUpdateKnowledge_updateKnowledge_data_attributes_categories | null;
}

export interface MutationUpdateKnowledge_updateKnowledge_data {
  __typename: "KnowledgeEntity";
  id: string | null;
  attributes: MutationUpdateKnowledge_updateKnowledge_data_attributes | null;
}

export interface MutationUpdateKnowledge_updateKnowledge {
  __typename: "KnowledgeEntityResponse";
  data: MutationUpdateKnowledge_updateKnowledge_data | null;
}

export interface MutationUpdateKnowledge {
  updateKnowledge: MutationUpdateKnowledge_updateKnowledge | null;
}

export interface MutationUpdateKnowledgeVariables {
  knowledgeId: string;
  title: string;
  content?: string | null;
  categories?: (string | null)[] | null;
}
