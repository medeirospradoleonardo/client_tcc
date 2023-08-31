/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_USERSPERMISSIONSUSER_TYPE } from "./globalTypes";

// ====================================================
// GraphQL query operation: QueryAllUsersInProject
// ====================================================

export interface QueryAllUsersInProject_usersPermissionsUsers_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
  type: ENUM_USERSPERMISSIONSUSER_TYPE;
}

export interface QueryAllUsersInProject_usersPermissionsUsers_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: QueryAllUsersInProject_usersPermissionsUsers_data_attributes | null;
}

export interface QueryAllUsersInProject_usersPermissionsUsers {
  __typename: "UsersPermissionsUserEntityResponseCollection";
  data: QueryAllUsersInProject_usersPermissionsUsers_data[];
}

export interface QueryAllUsersInProject {
  usersPermissionsUsers: QueryAllUsersInProject_usersPermissionsUsers | null;
}

export interface QueryAllUsersInProjectVariables {
  projectId: string;
}
