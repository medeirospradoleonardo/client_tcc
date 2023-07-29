/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MutationDeleteProjectUserRole
// ====================================================

export interface MutationDeleteProjectUserRole_deleteProjectUserRole_data {
  __typename: "ProjectUserRoleEntity";
  id: string | null;
}

export interface MutationDeleteProjectUserRole_deleteProjectUserRole {
  __typename: "ProjectUserRoleEntityResponse";
  data: MutationDeleteProjectUserRole_deleteProjectUserRole_data | null;
}

export interface MutationDeleteProjectUserRole {
  deleteProjectUserRole: MutationDeleteProjectUserRole_deleteProjectUserRole | null;
}

export interface MutationDeleteProjectUserRoleVariables {
  id: string;
}
