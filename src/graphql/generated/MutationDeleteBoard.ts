/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MutationDeleteBoard
// ====================================================

export interface MutationDeleteBoard_deleteBoard_data {
  __typename: "BoardEntity";
  id: string | null;
}

export interface MutationDeleteBoard_deleteBoard {
  __typename: "BoardEntityResponse";
  data: MutationDeleteBoard_deleteBoard_data | null;
}

export interface MutationDeleteBoard {
  deleteBoard: MutationDeleteBoard_deleteBoard | null;
}

export interface MutationDeleteBoardVariables {
  id: string;
}
