/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MutationUpdateProjectBoards
// ====================================================

export interface MutationUpdateProjectBoards_updateProject_data {
  __typename: "ProjectEntity";
  id: string | null;
}

export interface MutationUpdateProjectBoards_updateProject {
  __typename: "ProjectEntityResponse";
  data: MutationUpdateProjectBoards_updateProject_data | null;
}

export interface MutationUpdateProjectBoards {
  updateProject: MutationUpdateProjectBoards_updateProject | null;
}

export interface MutationUpdateProjectBoardsVariables {
  id: string;
  boardsIds: (string | null)[];
}
