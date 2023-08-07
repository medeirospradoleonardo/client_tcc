/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MutationUpdateProject
// ====================================================

export interface MutationUpdateProject_updateProject_data {
  __typename: "ProjectEntity";
  id: string | null;
}

export interface MutationUpdateProject_updateProject {
  __typename: "ProjectEntityResponse";
  data: MutationUpdateProject_updateProject_data | null;
}

export interface MutationUpdateProject {
  updateProject: MutationUpdateProject_updateProject | null;
}

export interface MutationUpdateProjectVariables {
  id: string;
  nameProject: string;
}
