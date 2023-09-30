/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryGetKnowledgeCategories
// ====================================================

export interface QueryGetKnowledgeCategories_knowledge_data_attributes_categories_data_attributes {
  __typename: "Category";
  name: string;
}

export interface QueryGetKnowledgeCategories_knowledge_data_attributes_categories_data {
  __typename: "CategoryEntity";
  id: string | null;
  attributes: QueryGetKnowledgeCategories_knowledge_data_attributes_categories_data_attributes | null;
}

export interface QueryGetKnowledgeCategories_knowledge_data_attributes_categories {
  __typename: "CategoryRelationResponseCollection";
  data: QueryGetKnowledgeCategories_knowledge_data_attributes_categories_data[];
}

export interface QueryGetKnowledgeCategories_knowledge_data_attributes {
  __typename: "Knowledge";
  categories: QueryGetKnowledgeCategories_knowledge_data_attributes_categories | null;
}

export interface QueryGetKnowledgeCategories_knowledge_data {
  __typename: "KnowledgeEntity";
  id: string | null;
  attributes: QueryGetKnowledgeCategories_knowledge_data_attributes | null;
}

export interface QueryGetKnowledgeCategories_knowledge {
  __typename: "KnowledgeEntityResponse";
  data: QueryGetKnowledgeCategories_knowledge_data | null;
}

export interface QueryGetKnowledgeCategories {
  knowledge: QueryGetKnowledgeCategories_knowledge | null;
}

export interface QueryGetKnowledgeCategoriesVariables {
  id: string;
}
