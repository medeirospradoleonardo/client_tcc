/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryProjectUserRolesByUserAndProject
// ====================================================

export interface QueryProjectUserRolesByUserAndProject_projectUserRoles_data {
  __typename: "ProjectUserRoleEntity";
  id: string | null;
}

export interface QueryProjectUserRolesByUserAndProject_projectUserRoles {
  __typename: "ProjectUserRoleEntityResponseCollection";
  data: QueryProjectUserRolesByUserAndProject_projectUserRoles_data[];
}

export interface QueryProjectUserRolesByUserAndProject {
  projectUserRoles: QueryProjectUserRolesByUserAndProject_projectUserRoles | null;
}

export interface QueryProjectUserRolesByUserAndProjectVariables {
  userId: string;
  projectId: string;
}
