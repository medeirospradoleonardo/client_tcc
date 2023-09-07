/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_BOARD_STATUS } from "./globalTypes";

// ====================================================
// GraphQL query operation: QuerySprintBoards
// ====================================================

export interface QuerySprintBoards_sprint_data_attributes_boards_data_attributes_author_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface QuerySprintBoards_sprint_data_attributes_boards_data_attributes_author_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: QuerySprintBoards_sprint_data_attributes_boards_data_attributes_author_data_attributes | null;
}

export interface QuerySprintBoards_sprint_data_attributes_boards_data_attributes_author {
  __typename: "UsersPermissionsUserEntityResponse";
  data: QuerySprintBoards_sprint_data_attributes_boards_data_attributes_author_data | null;
}

export interface QuerySprintBoards_sprint_data_attributes_boards_data_attributes_responsible_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface QuerySprintBoards_sprint_data_attributes_boards_data_attributes_responsible_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: QuerySprintBoards_sprint_data_attributes_boards_data_attributes_responsible_data_attributes | null;
}

export interface QuerySprintBoards_sprint_data_attributes_boards_data_attributes_responsible {
  __typename: "UsersPermissionsUserEntityResponse";
  data: QuerySprintBoards_sprint_data_attributes_boards_data_attributes_responsible_data | null;
}

export interface QuerySprintBoards_sprint_data_attributes_boards_data_attributes_sprint_data {
  __typename: "SprintEntity";
  id: string | null;
}

export interface QuerySprintBoards_sprint_data_attributes_boards_data_attributes_sprint {
  __typename: "SprintEntityResponse";
  data: QuerySprintBoards_sprint_data_attributes_boards_data_attributes_sprint_data | null;
}

export interface QuerySprintBoards_sprint_data_attributes_boards_data_attributes {
  __typename: "Board";
  title: string;
  timeEstimated: number;
  description: string | null;
  author: QuerySprintBoards_sprint_data_attributes_boards_data_attributes_author | null;
  responsible: QuerySprintBoards_sprint_data_attributes_boards_data_attributes_responsible | null;
  sprint: QuerySprintBoards_sprint_data_attributes_boards_data_attributes_sprint | null;
  status: ENUM_BOARD_STATUS;
}

export interface QuerySprintBoards_sprint_data_attributes_boards_data {
  __typename: "BoardEntity";
  id: string | null;
  attributes: QuerySprintBoards_sprint_data_attributes_boards_data_attributes | null;
}

export interface QuerySprintBoards_sprint_data_attributes_boards {
  __typename: "BoardRelationResponseCollection";
  data: QuerySprintBoards_sprint_data_attributes_boards_data[];
}

export interface QuerySprintBoards_sprint_data_attributes {
  __typename: "Sprint";
  boards: QuerySprintBoards_sprint_data_attributes_boards | null;
}

export interface QuerySprintBoards_sprint_data {
  __typename: "SprintEntity";
  id: string | null;
  attributes: QuerySprintBoards_sprint_data_attributes | null;
}

export interface QuerySprintBoards_sprint {
  __typename: "SprintEntityResponse";
  data: QuerySprintBoards_sprint_data | null;
}

export interface QuerySprintBoards {
  sprint: QuerySprintBoards_sprint | null;
}

export interface QuerySprintBoardsVariables {
  id: string;
}
