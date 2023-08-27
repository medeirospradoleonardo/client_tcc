/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_BOARD_STATUS } from "./globalTypes";

// ====================================================
// GraphQL query operation: QueryProjectBoards
// ====================================================

export interface QueryProjectBoards_project_data_attributes_boards_data_attributes_sprint_data {
  __typename: "SprintEntity";
  id: string | null;
}

export interface QueryProjectBoards_project_data_attributes_boards_data_attributes_sprint {
  __typename: "SprintEntityResponse";
  data: QueryProjectBoards_project_data_attributes_boards_data_attributes_sprint_data | null;
}

export interface QueryProjectBoards_project_data_attributes_boards_data_attributes_author_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface QueryProjectBoards_project_data_attributes_boards_data_attributes_author_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: QueryProjectBoards_project_data_attributes_boards_data_attributes_author_data_attributes | null;
}

export interface QueryProjectBoards_project_data_attributes_boards_data_attributes_author {
  __typename: "UsersPermissionsUserEntityResponse";
  data: QueryProjectBoards_project_data_attributes_boards_data_attributes_author_data | null;
}

export interface QueryProjectBoards_project_data_attributes_boards_data_attributes_responsible_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface QueryProjectBoards_project_data_attributes_boards_data_attributes_responsible_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: QueryProjectBoards_project_data_attributes_boards_data_attributes_responsible_data_attributes | null;
}

export interface QueryProjectBoards_project_data_attributes_boards_data_attributes_responsible {
  __typename: "UsersPermissionsUserEntityResponse";
  data: QueryProjectBoards_project_data_attributes_boards_data_attributes_responsible_data | null;
}

export interface QueryProjectBoards_project_data_attributes_boards_data_attributes {
  __typename: "Board";
  sprint: QueryProjectBoards_project_data_attributes_boards_data_attributes_sprint | null;
  title: string;
  timeEstimated: number;
  description: string | null;
  author: QueryProjectBoards_project_data_attributes_boards_data_attributes_author | null;
  responsible: QueryProjectBoards_project_data_attributes_boards_data_attributes_responsible | null;
  status: ENUM_BOARD_STATUS | null;
}

export interface QueryProjectBoards_project_data_attributes_boards_data {
  __typename: "BoardEntity";
  id: string | null;
  attributes: QueryProjectBoards_project_data_attributes_boards_data_attributes | null;
}

export interface QueryProjectBoards_project_data_attributes_boards {
  __typename: "BoardRelationResponseCollection";
  data: QueryProjectBoards_project_data_attributes_boards_data[];
}

export interface QueryProjectBoards_project_data_attributes {
  __typename: "Project";
  name: string;
  boards: QueryProjectBoards_project_data_attributes_boards | null;
}

export interface QueryProjectBoards_project_data {
  __typename: "ProjectEntity";
  id: string | null;
  attributes: QueryProjectBoards_project_data_attributes | null;
}

export interface QueryProjectBoards_project {
  __typename: "ProjectEntityResponse";
  data: QueryProjectBoards_project_data | null;
}

export interface QueryProjectBoards {
  project: QueryProjectBoards_project | null;
}

export interface QueryProjectBoardsVariables {
  id: string;
}
