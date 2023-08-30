/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QuerySprintsInProject
// ====================================================

export interface QuerySprintsInProject_sprints_data_attributes {
  __typename: "Sprint";
  name: string;
}

export interface QuerySprintsInProject_sprints_data {
  __typename: "SprintEntity";
  id: string | null;
  attributes: QuerySprintsInProject_sprints_data_attributes | null;
}

export interface QuerySprintsInProject_sprints {
  __typename: "SprintEntityResponseCollection";
  data: QuerySprintsInProject_sprints_data[];
}

export interface QuerySprintsInProject {
  sprints: QuerySprintsInProject_sprints | null;
}

export interface QuerySprintsInProjectVariables {
  projectId: string;
}
