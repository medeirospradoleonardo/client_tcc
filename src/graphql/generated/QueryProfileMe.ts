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

export interface QueryProfileMe_usersPermissionsUser_data_attributes_activeSprints_data_attributes_sprint_data_attributes {
  __typename: "Sprint";
  name: string;
}

export interface QueryProfileMe_usersPermissionsUser_data_attributes_activeSprints_data_attributes_sprint_data {
  __typename: "SprintEntity";
  id: string | null;
  attributes: QueryProfileMe_usersPermissionsUser_data_attributes_activeSprints_data_attributes_sprint_data_attributes | null;
}

export interface QueryProfileMe_usersPermissionsUser_data_attributes_activeSprints_data_attributes_sprint {
  __typename: "SprintEntityResponse";
  data: QueryProfileMe_usersPermissionsUser_data_attributes_activeSprints_data_attributes_sprint_data | null;
}

export interface QueryProfileMe_usersPermissionsUser_data_attributes_activeSprints_data_attributes_project_data {
  __typename: "ProjectEntity";
  id: string | null;
}

export interface QueryProfileMe_usersPermissionsUser_data_attributes_activeSprints_data_attributes_project {
  __typename: "ProjectEntityResponse";
  data: QueryProfileMe_usersPermissionsUser_data_attributes_activeSprints_data_attributes_project_data | null;
}

export interface QueryProfileMe_usersPermissionsUser_data_attributes_activeSprints_data_attributes {
  __typename: "ActiveSprint";
  sprint: QueryProfileMe_usersPermissionsUser_data_attributes_activeSprints_data_attributes_sprint | null;
  project: QueryProfileMe_usersPermissionsUser_data_attributes_activeSprints_data_attributes_project | null;
}

export interface QueryProfileMe_usersPermissionsUser_data_attributes_activeSprints_data {
  __typename: "ActiveSprintEntity";
  id: string | null;
  attributes: QueryProfileMe_usersPermissionsUser_data_attributes_activeSprints_data_attributes | null;
}

export interface QueryProfileMe_usersPermissionsUser_data_attributes_activeSprints {
  __typename: "ActiveSprintRelationResponseCollection";
  data: QueryProfileMe_usersPermissionsUser_data_attributes_activeSprints_data[];
}

export interface QueryProfileMe_usersPermissionsUser_data_attributes {
  __typename: "UsersPermissionsUser";
  email: string;
  username: string;
  type: ENUM_USERSPERMISSIONSUSER_TYPE;
  activeProject: QueryProfileMe_usersPermissionsUser_data_attributes_activeProject | null;
  activeSprints: QueryProfileMe_usersPermissionsUser_data_attributes_activeSprints | null;
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
