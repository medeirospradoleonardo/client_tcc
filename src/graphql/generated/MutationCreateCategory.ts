/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MutationCreateCategory
// ====================================================

export interface MutationCreateCategory_createCategory_data {
  __typename: "CategoryEntity";
  id: string | null;
}

export interface MutationCreateCategory_createCategory {
  __typename: "CategoryEntityResponse";
  data: MutationCreateCategory_createCategory_data | null;
}

export interface MutationCreateCategory {
  createCategory: MutationCreateCategory_createCategory | null;
}

export interface MutationCreateCategoryVariables {
  name: string;
}
