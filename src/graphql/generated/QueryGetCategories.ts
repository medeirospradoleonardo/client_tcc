/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryGetCategories
// ====================================================

export interface QueryGetCategories_categories_data_attributes {
  __typename: "Category";
  name: string;
}

export interface QueryGetCategories_categories_data {
  __typename: "CategoryEntity";
  id: string | null;
  attributes: QueryGetCategories_categories_data_attributes | null;
}

export interface QueryGetCategories_categories {
  __typename: "CategoryEntityResponseCollection";
  data: QueryGetCategories_categories_data[];
}

export interface QueryGetCategories {
  categories: QueryGetCategories_categories | null;
}
