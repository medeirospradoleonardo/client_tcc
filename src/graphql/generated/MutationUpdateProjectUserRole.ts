/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_PROJECTUSERROLE_ROLE } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MutationUpdateProjectUserRole
// ====================================================

export interface MutationUpdateProjectUserRole_updateProjectUserRole_data {
  __typename: "ProjectUserRoleEntity";
  id: string | null;
}

export interface MutationUpdateProjectUserRole_updateProjectUserRole {
  __typename: "ProjectUserRoleEntityResponse";
  data: MutationUpdateProjectUserRole_updateProjectUserRole_data | null;
}

export interface MutationUpdateProjectUserRole {
  updateProjectUserRole: MutationUpdateProjectUserRole_updateProjectUserRole | null;
}

export interface MutationUpdateProjectUserRoleVariables {
  role: ENUM_PROJECTUSERROLE_ROLE;
  userId: string;
  projectId: string;
  projectUserRoleId: string;
}
