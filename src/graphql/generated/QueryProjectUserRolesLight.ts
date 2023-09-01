/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_PROJECTUSERROLE_ROLE } from "./globalTypes";

// ====================================================
// GraphQL query operation: QueryProjectUserRolesLight
// ====================================================

export interface QueryProjectUserRolesLight_projectUserRoles_data_attributes_project_data {
  __typename: "ProjectEntity";
  id: string | null;
}

export interface QueryProjectUserRolesLight_projectUserRoles_data_attributes_project {
  __typename: "ProjectEntityResponse";
  data: QueryProjectUserRolesLight_projectUserRoles_data_attributes_project_data | null;
}

export interface QueryProjectUserRolesLight_projectUserRoles_data_attributes {
  __typename: "ProjectUserRole";
  role: ENUM_PROJECTUSERROLE_ROLE | null;
  project: QueryProjectUserRolesLight_projectUserRoles_data_attributes_project | null;
}

export interface QueryProjectUserRolesLight_projectUserRoles_data {
  __typename: "ProjectUserRoleEntity";
  id: string | null;
  attributes: QueryProjectUserRolesLight_projectUserRoles_data_attributes | null;
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
