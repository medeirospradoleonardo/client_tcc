/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_BOARD_STATUS } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MutationUpdateBoard
// ====================================================

export interface MutationUpdateBoard_updateBoard_data_attributes_author_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface MutationUpdateBoard_updateBoard_data_attributes_author_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: MutationUpdateBoard_updateBoard_data_attributes_author_data_attributes | null;
}

export interface MutationUpdateBoard_updateBoard_data_attributes_author {
  __typename: "UsersPermissionsUserEntityResponse";
  data: MutationUpdateBoard_updateBoard_data_attributes_author_data | null;
}

export interface MutationUpdateBoard_updateBoard_data_attributes_responsible_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface MutationUpdateBoard_updateBoard_data_attributes_responsible_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: MutationUpdateBoard_updateBoard_data_attributes_responsible_data_attributes | null;
}

export interface MutationUpdateBoard_updateBoard_data_attributes_responsible {
  __typename: "UsersPermissionsUserEntityResponse";
  data: MutationUpdateBoard_updateBoard_data_attributes_responsible_data | null;
}

export interface MutationUpdateBoard_updateBoard_data_attributes_sprint_data {
  __typename: "SprintEntity";
  id: string | null;
}

export interface MutationUpdateBoard_updateBoard_data_attributes_sprint {
  __typename: "SprintEntityResponse";
  data: MutationUpdateBoard_updateBoard_data_attributes_sprint_data | null;
}

export interface MutationUpdateBoard_updateBoard_data_attributes {
  __typename: "Board";
  createdAt: any | null;
  conclusionDate: any | null;
  title: string;
  timeEstimated: number;
  description: string | null;
  author: MutationUpdateBoard_updateBoard_data_attributes_author | null;
  responsible: MutationUpdateBoard_updateBoard_data_attributes_responsible | null;
  sprint: MutationUpdateBoard_updateBoard_data_attributes_sprint | null;
  status: ENUM_BOARD_STATUS;
}

export interface MutationUpdateBoard_updateBoard_data {
  __typename: "BoardEntity";
  id: string | null;
  attributes: MutationUpdateBoard_updateBoard_data_attributes | null;
}

export interface MutationUpdateBoard_updateBoard {
  __typename: "BoardEntityResponse";
  data: MutationUpdateBoard_updateBoard_data | null;
}

export interface MutationUpdateBoard {
  updateBoard: MutationUpdateBoard_updateBoard | null;
}

export interface MutationUpdateBoardVariables {
  boardId: string;
  title: string;
  description: string;
  timeEstimated: number;
  status: ENUM_BOARD_STATUS;
  sprintId?: string | null;
  authorId: string;
  responsibleId: string;
  projectId: string;
}
