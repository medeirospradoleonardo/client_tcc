/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MutationUpdateSprintBoards
// ====================================================

export interface MutationUpdateSprintBoards_updateSprint_data_attributes {
  __typename: "Sprint";
  name: string;
  initialDate: any | null;
  finalDate: any | null;
  expand: boolean | null;
}

export interface MutationUpdateSprintBoards_updateSprint_data {
  __typename: "SprintEntity";
  id: string | null;
  attributes: MutationUpdateSprintBoards_updateSprint_data_attributes | null;
}

export interface MutationUpdateSprintBoards_updateSprint {
  __typename: "SprintEntityResponse";
  data: MutationUpdateSprintBoards_updateSprint_data | null;
}

export interface MutationUpdateSprintBoards {
  updateSprint: MutationUpdateSprintBoards_updateSprint | null;
}

export interface MutationUpdateSprintBoardsVariables {
  id: string;
  boardsIds: (string | null)[];
}
