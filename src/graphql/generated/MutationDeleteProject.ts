/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MutationDeleteProject
// ====================================================

export interface MutationDeleteProject_deleteProject_data {
  __typename: "ProjectEntity";
  id: string | null;
}

export interface MutationDeleteProject_deleteProject {
  __typename: "ProjectEntityResponse";
  data: MutationDeleteProject_deleteProject_data | null;
}

export interface MutationDeleteProject {
  deleteProject: MutationDeleteProject_deleteProject | null;
}

export interface MutationDeleteProjectVariables {
  id: string;
}
