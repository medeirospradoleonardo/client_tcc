/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_PROJECTUSERROLE_ROLE } from "./globalTypes";

// ====================================================
// GraphQL query operation: QueryProjectUserRolesFull
// ====================================================

export interface QueryProjectUserRolesFull_projectUserRoles_data_attributes_project_data_attributes_projectUserRoles_data_attributes_user_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface QueryProjectUserRolesFull_projectUserRoles_data_attributes_project_data_attributes_projectUserRoles_data_attributes_user_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: QueryProjectUserRolesFull_projectUserRoles_data_attributes_project_data_attributes_projectUserRoles_data_attributes_user_data_attributes | null;
}

export interface QueryProjectUserRolesFull_projectUserRoles_data_attributes_project_data_attributes_projectUserRoles_data_attributes_user {
  __typename: "UsersPermissionsUserEntityResponse";
  data: QueryProjectUserRolesFull_projectUserRoles_data_attributes_project_data_attributes_projectUserRoles_data_attributes_user_data | null;
}

export interface QueryProjectUserRolesFull_projectUserRoles_data_attributes_project_data_attributes_projectUserRoles_data_attributes {
  __typename: "ProjectUserRole";
  user: QueryProjectUserRolesFull_projectUserRoles_data_attributes_project_data_attributes_projectUserRoles_data_attributes_user | null;
}

export interface QueryProjectUserRolesFull_projectUserRoles_data_attributes_project_data_attributes_projectUserRoles_data {
  __typename: "ProjectUserRoleEntity";
  attributes: QueryProjectUserRolesFull_projectUserRoles_data_attributes_project_data_attributes_projectUserRoles_data_attributes | null;
}

export interface QueryProjectUserRolesFull_projectUserRoles_data_attributes_project_data_attributes_projectUserRoles {
  __typename: "ProjectUserRoleRelationResponseCollection";
  data: QueryProjectUserRolesFull_projectUserRoles_data_attributes_project_data_attributes_projectUserRoles_data[];
}

export interface QueryProjectUserRolesFull_projectUserRoles_data_attributes_project_data_attributes {
  __typename: "Project";
  name: string;
  projectUserRoles: QueryProjectUserRolesFull_projectUserRoles_data_attributes_project_data_attributes_projectUserRoles | null;
}

export interface QueryProjectUserRolesFull_projectUserRoles_data_attributes_project_data {
  __typename: "ProjectEntity";
  id: string | null;
  attributes: QueryProjectUserRolesFull_projectUserRoles_data_attributes_project_data_attributes | null;
}

export interface QueryProjectUserRolesFull_projectUserRoles_data_attributes_project {
  __typename: "ProjectEntityResponse";
  data: QueryProjectUserRolesFull_projectUserRoles_data_attributes_project_data | null;
}

export interface QueryProjectUserRolesFull_projectUserRoles_data_attributes {
  __typename: "ProjectUserRole";
  role: ENUM_PROJECTUSERROLE_ROLE | null;
  project: QueryProjectUserRolesFull_projectUserRoles_data_attributes_project | null;
}

export interface QueryProjectUserRolesFull_projectUserRoles_data {
  __typename: "ProjectUserRoleEntity";
  id: string | null;
  attributes: QueryProjectUserRolesFull_projectUserRoles_data_attributes | null;
}

export interface QueryProjectUserRolesFull_projectUserRoles {
  __typename: "ProjectUserRoleEntityResponseCollection";
  data: QueryProjectUserRolesFull_projectUserRoles_data[];
}

export interface QueryProjectUserRolesFull {
  projectUserRoles: QueryProjectUserRolesFull_projectUserRoles;
}

export interface QueryProjectUserRolesFullVariables {
  email: string;
}
