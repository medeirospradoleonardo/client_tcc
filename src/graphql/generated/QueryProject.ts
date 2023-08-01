/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_PROJECTUSERROLE_ROLE } from "./globalTypes";

// ====================================================
// GraphQL query operation: QueryProject
// ====================================================

export interface QueryProject_project_data_attributes_projectUserRoles_data_attributes_user_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface QueryProject_project_data_attributes_projectUserRoles_data_attributes_user_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: QueryProject_project_data_attributes_projectUserRoles_data_attributes_user_data_attributes | null;
}

export interface QueryProject_project_data_attributes_projectUserRoles_data_attributes_user {
  __typename: "UsersPermissionsUserEntityResponse";
  data: QueryProject_project_data_attributes_projectUserRoles_data_attributes_user_data | null;
}

export interface QueryProject_project_data_attributes_projectUserRoles_data_attributes {
  __typename: "ProjectUserRole";
  role: ENUM_PROJECTUSERROLE_ROLE | null;
  user: QueryProject_project_data_attributes_projectUserRoles_data_attributes_user | null;
}

export interface QueryProject_project_data_attributes_projectUserRoles_data {
  __typename: "ProjectUserRoleEntity";
  id: string | null;
  attributes: QueryProject_project_data_attributes_projectUserRoles_data_attributes | null;
}

export interface QueryProject_project_data_attributes_projectUserRoles {
  __typename: "ProjectUserRoleRelationResponseCollection";
  data: QueryProject_project_data_attributes_projectUserRoles_data[];
}

export interface QueryProject_project_data_attributes {
  __typename: "Project";
  name: string;
  projectUserRoles: QueryProject_project_data_attributes_projectUserRoles | null;
}

export interface QueryProject_project_data {
  __typename: "ProjectEntity";
  id: string | null;
  attributes: QueryProject_project_data_attributes | null;
}

export interface QueryProject_project {
  __typename: "ProjectEntityResponse";
  data: QueryProject_project_data | null;
}

export interface QueryProject {
  project: QueryProject_project | null;
}

export interface QueryProjectVariables {
  id: string;
}
