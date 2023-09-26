/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_USERSPERMISSIONSUSER_TYPE } from "./globalTypes";

// ====================================================
// GraphQL query operation: QueryAllUsers
// ====================================================

export interface QueryAllUsers_usersPermissionsUsers_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
  type: ENUM_USERSPERMISSIONSUSER_TYPE;
}

export interface QueryAllUsers_usersPermissionsUsers_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: QueryAllUsers_usersPermissionsUsers_data_attributes | null;
}

export interface QueryAllUsers_usersPermissionsUsers {
  __typename: "UsersPermissionsUserEntityResponseCollection";
  data: QueryAllUsers_usersPermissionsUsers_data[];
}

export interface QueryAllUsers {
  usersPermissionsUsers: QueryAllUsers_usersPermissionsUsers | null;
}

export interface QueryAllUsersVariables {
  IdUser?: string | null;
}
