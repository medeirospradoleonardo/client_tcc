/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryProjectUserRoles
// ====================================================

export interface QueryProjectUserRoles_usersPermissionsUsers_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface QueryProjectUserRoles_usersPermissionsUsers_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: QueryProjectUserRoles_usersPermissionsUsers_data_attributes | null;
}

export interface QueryProjectUserRoles_usersPermissionsUsers {
  __typename: "UsersPermissionsUserEntityResponseCollection";
  data: QueryProjectUserRoles_usersPermissionsUsers_data[];
}

export interface QueryProjectUserRoles {
  usersPermissionsUsers: QueryProjectUserRoles_usersPermissionsUsers | null;
}
