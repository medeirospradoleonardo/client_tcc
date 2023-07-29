/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MutationActiveProject
// ====================================================

export interface MutationActiveProject_updateUsersPermissionsUser_data_attributes_activeProject_data_attributes {
  __typename: "Project";
  name: string;
}

export interface MutationActiveProject_updateUsersPermissionsUser_data_attributes_activeProject_data {
  __typename: "ProjectEntity";
  id: string | null;
  attributes: MutationActiveProject_updateUsersPermissionsUser_data_attributes_activeProject_data_attributes | null;
}

export interface MutationActiveProject_updateUsersPermissionsUser_data_attributes_activeProject {
  __typename: "ProjectEntityResponse";
  data: MutationActiveProject_updateUsersPermissionsUser_data_attributes_activeProject_data | null;
}

export interface MutationActiveProject_updateUsersPermissionsUser_data_attributes {
  __typename: "UsersPermissionsUser";
  activeProject: MutationActiveProject_updateUsersPermissionsUser_data_attributes_activeProject | null;
}

export interface MutationActiveProject_updateUsersPermissionsUser_data {
  __typename: "UsersPermissionsUserEntity";
  attributes: MutationActiveProject_updateUsersPermissionsUser_data_attributes | null;
}

export interface MutationActiveProject_updateUsersPermissionsUser {
  __typename: "UsersPermissionsUserEntityResponse";
  data: MutationActiveProject_updateUsersPermissionsUser_data | null;
}

export interface MutationActiveProject {
  /**
   * Update an existing user
   */
  updateUsersPermissionsUser: MutationActiveProject_updateUsersPermissionsUser;
}

export interface MutationActiveProjectVariables {
  idProject: string;
  idUser: string;
}
