/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_USERSPERMISSIONSUSER_TYPE } from "./globalTypes";

// ====================================================
// GraphQL query operation: QueryProfileMe
// ====================================================

export interface QueryProfileMe_usersPermissionsUser_data_attributes_activeProject_data_attributes {
  __typename: "Project";
  name: string;
}

export interface QueryProfileMe_usersPermissionsUser_data_attributes_activeProject_data {
  __typename: "ProjectEntity";
  id: string | null;
  attributes: QueryProfileMe_usersPermissionsUser_data_attributes_activeProject_data_attributes | null;
}

export interface QueryProfileMe_usersPermissionsUser_data_attributes_activeProject {
  __typename: "ProjectEntityResponse";
  data: QueryProfileMe_usersPermissionsUser_data_attributes_activeProject_data | null;
}

export interface QueryProfileMe_usersPermissionsUser_data_attributes {
  __typename: "UsersPermissionsUser";
  email: string;
  username: string;
  type: ENUM_USERSPERMISSIONSUSER_TYPE;
  activeProject: QueryProfileMe_usersPermissionsUser_data_attributes_activeProject | null;
}

export interface QueryProfileMe_usersPermissionsUser_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: QueryProfileMe_usersPermissionsUser_data_attributes | null;
}

export interface QueryProfileMe_usersPermissionsUser {
  __typename: "UsersPermissionsUserEntityResponse";
  data: QueryProfileMe_usersPermissionsUser_data | null;
}

export interface QueryProfileMe {
  usersPermissionsUser: QueryProfileMe_usersPermissionsUser | null;
}

export interface QueryProfileMeVariables {
  identifier: string;
}
