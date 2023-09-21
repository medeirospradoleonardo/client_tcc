/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryKnowledges
// ====================================================

export interface QueryKnowledges_knowledges_data_attributes_author_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface QueryKnowledges_knowledges_data_attributes_author_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: QueryKnowledges_knowledges_data_attributes_author_data_attributes | null;
}

export interface QueryKnowledges_knowledges_data_attributes_author {
  __typename: "UsersPermissionsUserEntityResponse";
  data: QueryKnowledges_knowledges_data_attributes_author_data | null;
}

export interface QueryKnowledges_knowledges_data_attributes_categories_data_attributes {
  __typename: "Category";
  name: string;
}

export interface QueryKnowledges_knowledges_data_attributes_categories_data {
  __typename: "CategoryEntity";
  id: string | null;
  attributes: QueryKnowledges_knowledges_data_attributes_categories_data_attributes | null;
}

export interface QueryKnowledges_knowledges_data_attributes_categories {
  __typename: "CategoryRelationResponseCollection";
  data: QueryKnowledges_knowledges_data_attributes_categories_data[];
}

export interface QueryKnowledges_knowledges_data_attributes {
  __typename: "Knowledge";
  title: string;
  author: QueryKnowledges_knowledges_data_attributes_author | null;
  categories: QueryKnowledges_knowledges_data_attributes_categories | null;
}

export interface QueryKnowledges_knowledges_data {
  __typename: "KnowledgeEntity";
  id: string | null;
  attributes: QueryKnowledges_knowledges_data_attributes | null;
}

export interface QueryKnowledges_knowledges {
  __typename: "KnowledgeEntityResponseCollection";
  data: QueryKnowledges_knowledges_data[];
}

export interface QueryKnowledges {
  knowledges: QueryKnowledges_knowledges | null;
}
