/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryProjectUserRolesLight
// ====================================================

export interface QueryProjectUserRolesLight_projectUserRoles_data {
  __typename: "ProjectUserRoleEntity";
  id: string | null;
}

export interface QueryProjectUserRolesLight_projectUserRoles {
  __typename: "ProjectUserRoleEntityResponseCollection";
  data: QueryProjectUserRolesLight_projectUserRoles_data[];
}

export interface QueryProjectUserRolesLight {
  projectUserRoles: QueryProjectUserRolesLight_projectUserRoles | null;
}

export interface QueryProjectUserRolesLightVariables {
  email: string;
}
