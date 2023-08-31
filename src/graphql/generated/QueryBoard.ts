/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_BOARD_STATUS } from "./globalTypes";

// ====================================================
// GraphQL query operation: QueryBoard
// ====================================================

export interface QueryBoard_board_data_attributes_author_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface QueryBoard_board_data_attributes_author_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: QueryBoard_board_data_attributes_author_data_attributes | null;
}

export interface QueryBoard_board_data_attributes_author {
  __typename: "UsersPermissionsUserEntityResponse";
  data: QueryBoard_board_data_attributes_author_data | null;
}

export interface QueryBoard_board_data_attributes_responsible_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface QueryBoard_board_data_attributes_responsible_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: QueryBoard_board_data_attributes_responsible_data_attributes | null;
}

export interface QueryBoard_board_data_attributes_responsible {
  __typename: "UsersPermissionsUserEntityResponse";
  data: QueryBoard_board_data_attributes_responsible_data | null;
}

export interface QueryBoard_board_data_attributes_sprint_data {
  __typename: "SprintEntity";
  id: string | null;
}

export interface QueryBoard_board_data_attributes_sprint {
  __typename: "SprintEntityResponse";
  data: QueryBoard_board_data_attributes_sprint_data | null;
}

export interface QueryBoard_board_data_attributes {
  __typename: "Board";
  createdAt: any | null;
  conclusionDate: any | null;
  title: string;
  timeEstimated: number;
  description: string | null;
  author: QueryBoard_board_data_attributes_author | null;
  responsible: QueryBoard_board_data_attributes_responsible | null;
  sprint: QueryBoard_board_data_attributes_sprint | null;
  status: ENUM_BOARD_STATUS;
}

export interface QueryBoard_board_data {
  __typename: "BoardEntity";
  id: string | null;
  attributes: QueryBoard_board_data_attributes | null;
}

export interface QueryBoard_board {
  __typename: "BoardEntityResponse";
  data: QueryBoard_board_data | null;
}

export interface QueryBoard {
  board: QueryBoard_board | null;
}

export interface QueryBoardVariables {
  boardId: string;
}
