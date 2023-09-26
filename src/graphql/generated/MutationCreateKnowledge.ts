/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MutationCreateKnowledge
// ====================================================

export interface MutationCreateKnowledge_createKnowledge_data_attributes_author_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface MutationCreateKnowledge_createKnowledge_data_attributes_author_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: MutationCreateKnowledge_createKnowledge_data_attributes_author_data_attributes | null;
}

export interface MutationCreateKnowledge_createKnowledge_data_attributes_author {
  __typename: "UsersPermissionsUserEntityResponse";
  data: MutationCreateKnowledge_createKnowledge_data_attributes_author_data | null;
}

export interface MutationCreateKnowledge_createKnowledge_data_attributes_usersCanEdit_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface MutationCreateKnowledge_createKnowledge_data_attributes_usersCanEdit_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: MutationCreateKnowledge_createKnowledge_data_attributes_usersCanEdit_data_attributes | null;
}

export interface MutationCreateKnowledge_createKnowledge_data_attributes_usersCanEdit {
  __typename: "UsersPermissionsUserRelationResponseCollection";
  data: MutationCreateKnowledge_createKnowledge_data_attributes_usersCanEdit_data[];
}

export interface MutationCreateKnowledge_createKnowledge_data_attributes_categories_data_attributes {
  __typename: "Category";
  name: string;
}

export interface MutationCreateKnowledge_createKnowledge_data_attributes_categories_data {
  __typename: "CategoryEntity";
  id: string | null;
  attributes: MutationCreateKnowledge_createKnowledge_data_attributes_categories_data_attributes | null;
}

export interface MutationCreateKnowledge_createKnowledge_data_attributes_categories {
  __typename: "CategoryRelationResponseCollection";
  data: MutationCreateKnowledge_createKnowledge_data_attributes_categories_data[];
}

export interface MutationCreateKnowledge_createKnowledge_data_attributes {
  __typename: "Knowledge";
  title: string;
  content: string | null;
  author: MutationCreateKnowledge_createKnowledge_data_attributes_author | null;
  usersCanEdit: MutationCreateKnowledge_createKnowledge_data_attributes_usersCanEdit | null;
  categories: MutationCreateKnowledge_createKnowledge_data_attributes_categories | null;
}

export interface MutationCreateKnowledge_createKnowledge_data {
  __typename: "KnowledgeEntity";
  id: string | null;
  attributes: MutationCreateKnowledge_createKnowledge_data_attributes | null;
}

export interface MutationCreateKnowledge_createKnowledge {
  __typename: "KnowledgeEntityResponse";
  data: MutationCreateKnowledge_createKnowledge_data | null;
}

export interface MutationCreateKnowledge {
  createKnowledge: MutationCreateKnowledge_createKnowledge | null;
}

export interface MutationCreateKnowledgeVariables {
  title: string;
  content?: string | null;
  authorId: string;
  usersCanEdit?: (string | null)[] | null;
  categories?: (string | null)[] | null;
}
