/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MutationUpdateSprint
// ====================================================

export interface MutationUpdateSprint_updateSprint_data_attributes {
  __typename: "Sprint";
  name: string;
  initialDate: any | null;
  finalDate: any | null;
  expand: boolean | null;
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
