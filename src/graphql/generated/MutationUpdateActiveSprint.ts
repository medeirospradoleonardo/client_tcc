/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MutationUpdateActiveSprint
// ====================================================

export interface MutationUpdateActiveSprint_updateActiveSprint_data_attributes_sprint_data_attributes {
  __typename: "Sprint";
  name: string;
}

export interface MutationUpdateActiveSprint_updateActiveSprint_data_attributes_sprint_data {
  __typename: "SprintEntity";
  id: string | null;
  attributes: MutationUpdateActiveSprint_updateActiveSprint_data_attributes_sprint_data_attributes | null;
}

export interface MutationUpdateActiveSprint_updateActiveSprint_data_attributes_sprint {
  __typename: "SprintEntityResponse";
  data: MutationUpdateActiveSprint_updateActiveSprint_data_attributes_sprint_data | null;
}

export interface MutationUpdateActiveSprint_updateActiveSprint_data_attributes {
  __typename: "ActiveSprint";
  sprint: MutationUpdateActiveSprint_updateActiveSprint_data_attributes_sprint | null;
}

export interface MutationUpdateActiveSprint_updateActiveSprint_data {
  __typename: "ActiveSprintEntity";
  id: string | null;
  attributes: MutationUpdateActiveSprint_updateActiveSprint_data_attributes | null;
}

export interface MutationUpdateActiveSprint_updateActiveSprint {
  __typename: "ActiveSprintEntityResponse";
  data: MutationUpdateActiveSprint_updateActiveSprint_data | null;
}

export interface MutationUpdateActiveSprint {
  updateActiveSprint: MutationUpdateActiveSprint_updateActiveSprint | null;
}

export interface MutationUpdateActiveSprintVariables {
  activeSprintId: string;
  sprintId: string;
}
