/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_PROJECTUSERROLE_ROLE } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MutationCreateProjectUserRole
// ====================================================

export interface MutationCreateProjectUserRole_createProjectUserRole_data {
  __typename: "ProjectUserRoleEntity";
  id: string | null;
}

export interface MutationCreateProjectUserRole_createProjectUserRole {
  __typename: "ProjectUserRoleEntityResponse";
  data: MutationCreateProjectUserRole_createProjectUserRole_data | null;
}

export interface MutationCreateProjectUserRole {
  createProjectUserRole: MutationCreateProjectUserRole_createProjectUserRole | null;
}

export interface MutationCreateProjectUserRoleVariables {
  role: ENUM_PROJECTUSERROLE_ROLE;
  userId: string;
  projectId: string;
}
