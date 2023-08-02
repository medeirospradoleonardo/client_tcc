/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MutationUpdateUserName
// ====================================================

export interface MutationUpdateUserName_updateUsersPermissionsUser_data_attributes {
  __typename: "UsersPermissionsUser";
  email: string;
  username: string;
}

export interface MutationUpdateUserName_updateUsersPermissionsUser_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: MutationUpdateUserName_updateUsersPermissionsUser_data_attributes | null;
}

export interface MutationUpdateUserName_updateUsersPermissionsUser {
  __typename: "UsersPermissionsUserEntityResponse";
  data: MutationUpdateUserName_updateUsersPermissionsUser_data | null;
}

export interface MutationUpdateUserName {
  /**
   * Update an existing user
   */
  updateUsersPermissionsUser: MutationUpdateUserName_updateUsersPermissionsUser;
}

export interface MutationUpdateUserNameVariables {
  id: string;
  username: string;
}
