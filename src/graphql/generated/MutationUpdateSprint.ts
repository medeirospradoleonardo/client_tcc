/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_BOARD_STATUS } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MutationUpdateSprint
// ====================================================

export interface MutationUpdateSprint_updateSprint_data_attributes_boards_data_attributes_author_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface MutationUpdateSprint_updateSprint_data_attributes_boards_data_attributes_author_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: MutationUpdateSprint_updateSprint_data_attributes_boards_data_attributes_author_data_attributes | null;
}

export interface MutationUpdateSprint_updateSprint_data_attributes_boards_data_attributes_author {
  __typename: "UsersPermissionsUserEntityResponse";
  data: MutationUpdateSprint_updateSprint_data_attributes_boards_data_attributes_author_data | null;
}

export interface MutationUpdateSprint_updateSprint_data_attributes_boards_data_attributes_responsible_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface MutationUpdateSprint_updateSprint_data_attributes_boards_data_attributes_responsible_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: MutationUpdateSprint_updateSprint_data_attributes_boards_data_attributes_responsible_data_attributes | null;
}

export interface MutationUpdateSprint_updateSprint_data_attributes_boards_data_attributes_responsible {
  __typename: "UsersPermissionsUserEntityResponse";
  data: MutationUpdateSprint_updateSprint_data_attributes_boards_data_attributes_responsible_data | null;
}

export interface MutationUpdateSprint_updateSprint_data_attributes_boards_data_attributes_sprint_data {
  __typename: "SprintEntity";
  id: string | null;
}

export interface MutationUpdateSprint_updateSprint_data_attributes_boards_data_attributes_sprint {
  __typename: "SprintEntityResponse";
  data: MutationUpdateSprint_updateSprint_data_attributes_boards_data_attributes_sprint_data | null;
}

export interface MutationUpdateSprint_updateSprint_data_attributes_boards_data_attributes {
  __typename: "Board";
  title: string;
  timeEstimated: number;
  description: string | null;
  author: MutationUpdateSprint_updateSprint_data_attributes_boards_data_attributes_author | null;
  responsible: MutationUpdateSprint_updateSprint_data_attributes_boards_data_attributes_responsible | null;
  status: ENUM_BOARD_STATUS;
  sprint: MutationUpdateSprint_updateSprint_data_attributes_boards_data_attributes_sprint | null;
}

export interface MutationUpdateSprint_updateSprint_data_attributes_boards_data {
  __typename: "BoardEntity";
  id: string | null;
  attributes: MutationUpdateSprint_updateSprint_data_attributes_boards_data_attributes | null;
}

export interface MutationUpdateSprint_updateSprint_data_attributes_boards {
  __typename: "BoardRelationResponseCollection";
  data: MutationUpdateSprint_updateSprint_data_attributes_boards_data[];
}

export interface MutationUpdateSprint_updateSprint_data_attributes {
  __typename: "Sprint";
  name: string;
  initialDate: any | null;
  finalDate: any | null;
  expand: boolean | null;
  boards: MutationUpdateSprint_updateSprint_data_attributes_boards | null;
}

export interface MutationUpdateSprint_updateSprint_data {
  __typename: "SprintEntity";
  id: string | null;
  attributes: MutationUpdateSprint_updateSprint_data_attributes | null;
}

export interface MutationUpdateSprint_updateSprint {
  __typename: "SprintEntityResponse";
  data: MutationUpdateSprint_updateSprint_data | null;
}

export interface MutationUpdateSprint {
  updateSprint: MutationUpdateSprint_updateSprint | null;
}

export interface MutationUpdateSprintVariables {
  id: string;
  name: string;
  initialDate: any;
  finalDate: any;
}
