/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_BOARD_STATUS } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MutationCreateSprint
// ====================================================

export interface MutationCreateSprint_createSprint_data_attributes_boards_data_attributes_author_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface MutationCreateSprint_createSprint_data_attributes_boards_data_attributes_author_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: MutationCreateSprint_createSprint_data_attributes_boards_data_attributes_author_data_attributes | null;
}

export interface MutationCreateSprint_createSprint_data_attributes_boards_data_attributes_author {
  __typename: "UsersPermissionsUserEntityResponse";
  data: MutationCreateSprint_createSprint_data_attributes_boards_data_attributes_author_data | null;
}

export interface MutationCreateSprint_createSprint_data_attributes_boards_data_attributes_responsible_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface MutationCreateSprint_createSprint_data_attributes_boards_data_attributes_responsible_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: MutationCreateSprint_createSprint_data_attributes_boards_data_attributes_responsible_data_attributes | null;
}

export interface MutationCreateSprint_createSprint_data_attributes_boards_data_attributes_responsible {
  __typename: "UsersPermissionsUserEntityResponse";
  data: MutationCreateSprint_createSprint_data_attributes_boards_data_attributes_responsible_data | null;
}

export interface MutationCreateSprint_createSprint_data_attributes_boards_data_attributes {
  __typename: "Board";
  title: string;
  timeEstimated: number;
  description: string | null;
  author: MutationCreateSprint_createSprint_data_attributes_boards_data_attributes_author | null;
  responsible: MutationCreateSprint_createSprint_data_attributes_boards_data_attributes_responsible | null;
  status: ENUM_BOARD_STATUS;
}

export interface MutationCreateSprint_createSprint_data_attributes_boards_data {
  __typename: "BoardEntity";
  id: string | null;
  attributes: MutationCreateSprint_createSprint_data_attributes_boards_data_attributes | null;
}

export interface MutationCreateSprint_createSprint_data_attributes_boards {
  __typename: "BoardRelationResponseCollection";
  data: MutationCreateSprint_createSprint_data_attributes_boards_data[];
}

export interface MutationCreateSprint_createSprint_data_attributes {
  __typename: "Sprint";
  name: string;
  initialDate: any | null;
  finalDate: any | null;
  expand: boolean | null;
  boards: MutationCreateSprint_createSprint_data_attributes_boards | null;
}

export interface MutationCreateSprint_createSprint_data {
  __typename: "SprintEntity";
  id: string | null;
  attributes: MutationCreateSprint_createSprint_data_attributes | null;
}

export interface MutationCreateSprint_createSprint {
  __typename: "SprintEntityResponse";
  data: MutationCreateSprint_createSprint_data | null;
}

export interface MutationCreateSprint {
  createSprint: MutationCreateSprint_createSprint | null;
}

export interface MutationCreateSprintVariables {
  projectId: string;
  name: string;
  initialDate: any;
  finalDate: any;
}
