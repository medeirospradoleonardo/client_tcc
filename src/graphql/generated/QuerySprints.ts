/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_BOARD_STATUS } from "./globalTypes";

// ====================================================
// GraphQL query operation: QuerySprints
// ====================================================

export interface QuerySprints_sprints_data_attributes_boards_data_attributes_author_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface QuerySprints_sprints_data_attributes_boards_data_attributes_author_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: QuerySprints_sprints_data_attributes_boards_data_attributes_author_data_attributes | null;
}

export interface QuerySprints_sprints_data_attributes_boards_data_attributes_author {
  __typename: "UsersPermissionsUserEntityResponse";
  data: QuerySprints_sprints_data_attributes_boards_data_attributes_author_data | null;
}

export interface QuerySprints_sprints_data_attributes_boards_data_attributes_responsible_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface QuerySprints_sprints_data_attributes_boards_data_attributes_responsible_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: QuerySprints_sprints_data_attributes_boards_data_attributes_responsible_data_attributes | null;
}

export interface QuerySprints_sprints_data_attributes_boards_data_attributes_responsible {
  __typename: "UsersPermissionsUserEntityResponse";
  data: QuerySprints_sprints_data_attributes_boards_data_attributes_responsible_data | null;
}

export interface QuerySprints_sprints_data_attributes_boards_data_attributes {
  __typename: "Board";
  title: string;
  timeEstimated: number;
  description: string | null;
  author: QuerySprints_sprints_data_attributes_boards_data_attributes_author | null;
  responsible: QuerySprints_sprints_data_attributes_boards_data_attributes_responsible | null;
  status: ENUM_BOARD_STATUS | null;
}

export interface QuerySprints_sprints_data_attributes_boards_data {
  __typename: "BoardEntity";
  id: string | null;
  attributes: QuerySprints_sprints_data_attributes_boards_data_attributes | null;
}

export interface QuerySprints_sprints_data_attributes_boards {
  __typename: "BoardRelationResponseCollection";
  data: QuerySprints_sprints_data_attributes_boards_data[];
}

export interface QuerySprints_sprints_data_attributes {
  __typename: "Sprint";
  name: string;
  initialDate: any | null;
  finalDate: any | null;
  expand: boolean | null;
  boards: QuerySprints_sprints_data_attributes_boards | null;
}

export interface QuerySprints_sprints_data {
  __typename: "SprintEntity";
  id: string | null;
  attributes: QuerySprints_sprints_data_attributes | null;
}

export interface QuerySprints_sprints {
  __typename: "SprintEntityResponseCollection";
  data: QuerySprints_sprints_data[];
}

export interface QuerySprints {
  sprints: QuerySprints_sprints | null;
}

export interface QuerySprintsVariables {
  projectId: string;
}
