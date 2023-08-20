/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MutationSprintToggleExpand
// ====================================================

export interface MutationSprintToggleExpand_updateSprint_data_attributes {
  __typename: "Sprint";
  name: string;
  initialDate: any | null;
  finalDate: any | null;
  expand: boolean | null;
}

export interface MutationSprintToggleExpand_updateSprint_data {
  __typename: "SprintEntity";
  id: string | null;
  attributes: MutationSprintToggleExpand_updateSprint_data_attributes | null;
}

export interface MutationSprintToggleExpand_updateSprint {
  __typename: "SprintEntityResponse";
  data: MutationSprintToggleExpand_updateSprint_data | null;
}

export interface MutationSprintToggleExpand {
  updateSprint: MutationSprintToggleExpand_updateSprint | null;
}

export interface MutationSprintToggleExpandVariables {
  id: string;
  expand: boolean;
}
