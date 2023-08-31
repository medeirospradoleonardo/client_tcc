/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_BOARD_STATUS } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MutationCreateBoard
// ====================================================

export interface MutationCreateBoard_createBoard_data_attributes_author_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface MutationCreateBoard_createBoard_data_attributes_author_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: MutationCreateBoard_createBoard_data_attributes_author_data_attributes | null;
}

export interface MutationCreateBoard_createBoard_data_attributes_author {
  __typename: "UsersPermissionsUserEntityResponse";
  data: MutationCreateBoard_createBoard_data_attributes_author_data | null;
}

export interface MutationCreateBoard_createBoard_data_attributes_responsible_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface MutationCreateBoard_createBoard_data_attributes_responsible_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: MutationCreateBoard_createBoard_data_attributes_responsible_data_attributes | null;
}

export interface MutationCreateBoard_createBoard_data_attributes_responsible {
  __typename: "UsersPermissionsUserEntityResponse";
  data: MutationCreateBoard_createBoard_data_attributes_responsible_data | null;
}

export interface MutationCreateBoard_createBoard_data_attributes_sprint_data {
  __typename: "SprintEntity";
  id: string | null;
}

export interface MutationCreateBoard_createBoard_data_attributes_sprint {
  __typename: "SprintEntityResponse";
  data: MutationCreateBoard_createBoard_data_attributes_sprint_data | null;
}

export interface MutationCreateBoard_createBoard_data_attributes {
  __typename: "Board";
  createdAt: any | null;
  conclusionDate: any | null;
  title: string;
  timeEstimated: number;
  description: string | null;
  author: MutationCreateBoard_createBoard_data_attributes_author | null;
  responsible: MutationCreateBoard_createBoard_data_attributes_responsible | null;
  sprint: MutationCreateBoard_createBoard_data_attributes_sprint | null;
  status: ENUM_BOARD_STATUS;
}

export interface MutationCreateBoard_createBoard_data {
  __typename: "BoardEntity";
  id: string | null;
  attributes: MutationCreateBoard_createBoard_data_attributes | null;
}

export interface MutationCreateBoard_createBoard {
  __typename: "BoardEntityResponse";
  data: MutationCreateBoard_createBoard_data | null;
}

export interface MutationCreateBoard {
  createBoard: MutationCreateBoard_createBoard | null;
}

export interface MutationCreateBoardVariables {
  title: string;
  description: string;
  timeEstimated: number;
  status: ENUM_BOARD_STATUS;
  sprintId?: string | null;
  authorId: string;
  responsibleId: string;
  projectId: string;
}
