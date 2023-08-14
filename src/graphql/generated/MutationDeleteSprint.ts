/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MutationDeleteSprint
// ====================================================

export interface MutationDeleteSprint_deleteSprint_data {
  __typename: "SprintEntity";
  id: string | null;
}

export interface MutationDeleteSprint_deleteSprint {
  __typename: "SprintEntityResponse";
  data: MutationDeleteSprint_deleteSprint_data | null;
}

export interface MutationDeleteSprint {
  deleteSprint: MutationDeleteSprint_deleteSprint | null;
}

export interface MutationDeleteSprintVariables {
  id: string;
}
