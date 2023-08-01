/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MutationCreateProject
// ====================================================

export interface MutationCreateProject_createProject_data {
  __typename: "ProjectEntity";
  id: string | null;
}

export interface MutationCreateProject_createProject {
  __typename: "ProjectEntityResponse";
  data: MutationCreateProject_createProject_data | null;
}

export interface MutationCreateProject {
  createProject: MutationCreateProject_createProject | null;
}

export interface MutationCreateProjectVariables {
  nameProject: string;
}
