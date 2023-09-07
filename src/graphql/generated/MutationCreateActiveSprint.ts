/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MutationCreateActiveSprint
// ====================================================

export interface MutationCreateActiveSprint_createActiveSprint_data_attributes_sprint_data_attributes {
  __typename: "Sprint";
  name: string;
}

export interface MutationCreateActiveSprint_createActiveSprint_data_attributes_sprint_data {
  __typename: "SprintEntity";
  id: string | null;
  attributes: MutationCreateActiveSprint_createActiveSprint_data_attributes_sprint_data_attributes | null;
}

export interface MutationCreateActiveSprint_createActiveSprint_data_attributes_sprint {
  __typename: "SprintEntityResponse";
  data: MutationCreateActiveSprint_createActiveSprint_data_attributes_sprint_data | null;
}

export interface MutationCreateActiveSprint_createActiveSprint_data_attributes {
  __typename: "ActiveSprint";
  sprint: MutationCreateActiveSprint_createActiveSprint_data_attributes_sprint | null;
}

export interface MutationCreateActiveSprint_createActiveSprint_data {
  __typename: "ActiveSprintEntity";
  id: string | null;
  attributes: MutationCreateActiveSprint_createActiveSprint_data_attributes | null;
}

export interface MutationCreateActiveSprint_createActiveSprint {
  __typename: "ActiveSprintEntityResponse";
  data: MutationCreateActiveSprint_createActiveSprint_data | null;
}

export interface MutationCreateActiveSprint {
  createActiveSprint: MutationCreateActiveSprint_createActiveSprint | null;
}

export interface MutationCreateActiveSprintVariables {
  projectId: string;
  sprintId: string;
  userId: string;
}
