/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryGetKnowledges
// ====================================================

export interface QueryGetKnowledges_knowledges_data_attributes_author_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface QueryGetKnowledges_knowledges_data_attributes_author_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: QueryGetKnowledges_knowledges_data_attributes_author_data_attributes | null;
}

export interface QueryGetKnowledges_knowledges_data_attributes_author {
  __typename: "UsersPermissionsUserEntityResponse";
  data: QueryGetKnowledges_knowledges_data_attributes_author_data | null;
}

export interface QueryGetKnowledges_knowledges_data_attributes_categories_data_attributes {
  __typename: "Category";
  name: string;
}

export interface QueryGetKnowledges_knowledges_data_attributes_categories_data {
  __typename: "CategoryEntity";
  id: string | null;
  attributes: QueryGetKnowledges_knowledges_data_attributes_categories_data_attributes | null;
}

export interface QueryGetKnowledges_knowledges_data_attributes_categories {
  __typename: "CategoryRelationResponseCollection";
  data: QueryGetKnowledges_knowledges_data_attributes_categories_data[];
}

export interface QueryGetKnowledges_knowledges_data_attributes {
  __typename: "Knowledge";
  title: string;
  author: QueryGetKnowledges_knowledges_data_attributes_author | null;
  categories: QueryGetKnowledges_knowledges_data_attributes_categories | null;
}

export interface QueryGetKnowledges_knowledges_data {
  __typename: "KnowledgeEntity";
  id: string | null;
  attributes: QueryGetKnowledges_knowledges_data_attributes | null;
}

export interface QueryGetKnowledges_knowledges {
  __typename: "KnowledgeEntityResponseCollection";
  data: QueryGetKnowledges_knowledges_data[];
}

export interface QueryGetKnowledges {
  knowledges: QueryGetKnowledges_knowledges | null;
}

export interface QueryGetKnowledgesVariables {
  categories?: (string | null)[] | null;
  page?: number | null;
  pageSize: number;
  sort?: (string | null)[] | null;
  title?: string | null;
}
