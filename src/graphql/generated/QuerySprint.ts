/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QuerySprint
// ====================================================

export interface QuerySprint_sprint_data_attributes {
  __typename: "Sprint";
  name: string;
  initialDate: any | null;
  finalDate: any | null;
}

export interface QuerySprint_sprint_data {
  __typename: "SprintEntity";
  id: string | null;
  attributes: QuerySprint_sprint_data_attributes | null;
}

export interface QuerySprint_sprint {
  __typename: "SprintEntityResponse";
  data: QuerySprint_sprint_data | null;
}

export interface QuerySprint {
  sprint: QuerySprint_sprint | null;
}

export interface QuerySprintVariables {
  id: string;
}
