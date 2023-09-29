/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryGetKnowledgesTotal
// ====================================================

export interface QueryGetKnowledgesTotal_knowledges_meta_pagination {
  __typename: "Pagination";
  total: number;
}

export interface QueryGetKnowledgesTotal_knowledges_meta {
  __typename: "ResponseCollectionMeta";
  pagination: QueryGetKnowledgesTotal_knowledges_meta_pagination;
}

export interface QueryGetKnowledgesTotal_knowledges {
  __typename: "KnowledgeEntityResponseCollection";
  meta: QueryGetKnowledgesTotal_knowledges_meta;
}

export interface QueryGetKnowledgesTotal {
  knowledges: QueryGetKnowledgesTotal_knowledges | null;
}

export interface QueryGetKnowledgesTotalVariables {
  categories?: (string | null)[] | null;
  title?: string | null;
  authorId?: string | null;
}
