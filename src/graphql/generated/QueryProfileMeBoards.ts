/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_BOARD_STATUS } from "./globalTypes";

// ====================================================
// GraphQL query operation: QueryProfileMeBoards
// ====================================================

export interface QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject_data_attributes_boards_data_attributes_sprint_data {
  __typename: "SprintEntity";
  id: string | null;
}

export interface QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject_data_attributes_boards_data_attributes_sprint {
  __typename: "SprintEntityResponse";
  data: QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject_data_attributes_boards_data_attributes_sprint_data | null;
}

export interface QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject_data_attributes_boards_data_attributes_author_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject_data_attributes_boards_data_attributes_author_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject_data_attributes_boards_data_attributes_author_data_attributes | null;
}

export interface QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject_data_attributes_boards_data_attributes_author {
  __typename: "UsersPermissionsUserEntityResponse";
  data: QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject_data_attributes_boards_data_attributes_author_data | null;
}

export interface QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject_data_attributes_boards_data_attributes_responsible_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject_data_attributes_boards_data_attributes_responsible_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject_data_attributes_boards_data_attributes_responsible_data_attributes | null;
}

export interface QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject_data_attributes_boards_data_attributes_responsible {
  __typename: "UsersPermissionsUserEntityResponse";
  data: QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject_data_attributes_boards_data_attributes_responsible_data | null;
}

export interface QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject_data_attributes_boards_data_attributes {
  __typename: "Board";
  sprint: QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject_data_attributes_boards_data_attributes_sprint | null;
  title: string;
  timeEstimated: number;
  description: string | null;
  author: QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject_data_attributes_boards_data_attributes_author | null;
  responsible: QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject_data_attributes_boards_data_attributes_responsible | null;
  status: ENUM_BOARD_STATUS | null;
}

export interface QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject_data_attributes_boards_data {
  __typename: "BoardEntity";
  id: string | null;
  attributes: QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject_data_attributes_boards_data_attributes | null;
}

export interface QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject_data_attributes_boards {
  __typename: "BoardRelationResponseCollection";
  data: QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject_data_attributes_boards_data[];
}

export interface QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject_data_attributes {
  __typename: "Project";
  name: string;
  boards: QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject_data_attributes_boards | null;
}

export interface QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject_data {
  __typename: "ProjectEntity";
  id: string | null;
  attributes: QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject_data_attributes | null;
}

export interface QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject {
  __typename: "ProjectEntityResponse";
  data: QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject_data | null;
}

export interface QueryProfileMeBoards_usersPermissionsUser_data_attributes {
  __typename: "UsersPermissionsUser";
  email: string;
  username: string;
  activeProject: QueryProfileMeBoards_usersPermissionsUser_data_attributes_activeProject | null;
}

export interface QueryProfileMeBoards_usersPermissionsUser_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: QueryProfileMeBoards_usersPermissionsUser_data_attributes | null;
}

export interface QueryProfileMeBoards_usersPermissionsUser {
  __typename: "UsersPermissionsUserEntityResponse";
  data: QueryProfileMeBoards_usersPermissionsUser_data | null;
}

export interface QueryProfileMeBoards {
  usersPermissionsUser: QueryProfileMeBoards_usersPermissionsUser | null;
}

export interface QueryProfileMeBoardsVariables {
  identifier: string;
}
