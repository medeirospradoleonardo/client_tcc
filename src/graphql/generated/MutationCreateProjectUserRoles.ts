/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_PROJECTUSERROLE_ROLE } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MutationCreateProjectUserRoles
// ====================================================

export interface MutationCreateProjectUserRoles_createProjectUserRole_data {
  __typename: "ProjectUserRoleEntity";
  id: string | null;
}

export interface MutationCreateProjectUserRoles_createProjectUserRole {
  __typename: "ProjectUserRoleEntityResponse";
  data: MutationCreateProjectUserRoles_createProjectUserRole_data | null;
}

export interface MutationCreateProjectUserRoles {
  createProjectUserRole: MutationCreateProjectUserRoles_createProjectUserRole | null;
}

export interface MutationCreateProjectUserRolesVariables {
  role: ENUM_PROJECTUSERROLE_ROLE;
  userId: string;
}
