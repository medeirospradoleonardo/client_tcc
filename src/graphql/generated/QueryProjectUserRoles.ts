/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_PROJECTUSERROLE_ROLE } from "./globalTypes";

// ====================================================
// GraphQL query operation: QueryProjectUserRoles
// ====================================================

export interface QueryProjectUserRoles_projectUserRoles_data_attributes_project_data_attributes {
  __typename: "Project";
  name: string;
}

export interface QueryProjectUserRoles_projectUserRoles_data_attributes_project_data {
  __typename: "ProjectEntity";
  attributes: QueryProjectUserRoles_projectUserRoles_data_attributes_project_data_attributes | null;
}

export interface QueryProjectUserRoles_projectUserRoles_data_attributes_project {
  __typename: "ProjectEntityResponse";
  data: QueryProjectUserRoles_projectUserRoles_data_attributes_project_data | null;
}

export interface QueryProjectUserRoles_projectUserRoles_data_attributes {
  __typename: "ProjectUserRole";
  role: ENUM_PROJECTUSERROLE_ROLE | null;
  project: QueryProjectUserRoles_projectUserRoles_data_attributes_project | null;
}

export interface QueryProjectUserRoles_projectUserRoles_data {
  __typename: "ProjectUserRoleEntity";
  attributes: QueryProjectUserRoles_projectUserRoles_data_attributes | null;
}

export interface QueryProjectUserRoles_projectUserRoles {
  __typename: "ProjectUserRoleEntityResponseCollection";
  data: QueryProjectUserRoles_projectUserRoles_data[];
}

export interface QueryProjectUserRoles {
  projectUserRoles: QueryProjectUserRoles_projectUserRoles | null;
}

export interface QueryProjectUserRolesVariables {
  email: string;
}
