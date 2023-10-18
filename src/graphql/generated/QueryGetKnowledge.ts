/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryGetKnowledge
// ====================================================

export interface QueryGetKnowledge_knowledge_data_attributes_author_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface QueryGetKnowledge_knowledge_data_attributes_author_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: QueryGetKnowledge_knowledge_data_attributes_author_data_attributes | null;
}

export interface QueryGetKnowledge_knowledge_data_attributes_author {
  __typename: "UsersPermissionsUserEntityResponse";
  data: QueryGetKnowledge_knowledge_data_attributes_author_data | null;
}

export interface QueryGetKnowledge_knowledge_data_attributes_usersCanEdit_data_attributes {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface QueryGetKnowledge_knowledge_data_attributes_usersCanEdit_data {
  __typename: "UsersPermissionsUserEntity";
  id: string | null;
  attributes: QueryGetKnowledge_knowledge_data_attributes_usersCanEdit_data_attributes | null;
}

export interface QueryGetKnowledge_knowledge_data_attributes_usersCanEdit {
  __typename: "UsersPermissionsUserRelationResponseCollection";
  data: QueryGetKnowledge_knowledge_data_attributes_usersCanEdit_data[];
}

export interface QueryGetKnowledge_knowledge_data_attributes_categories_data_attributes {
  __typename: "Category";
  name: string;
}

export interface QueryGetKnowledge_knowledge_data_attributes_categories_data {
  __typename: "CategoryEntity";
  id: string | null;
  attributes: QueryGetKnowledge_knowledge_data_attributes_categories_data_attributes | null;
}

export interface QueryGetKnowledge_knowledge_data_attributes_categories {
  __typename: "CategoryRelationResponseCollection";
  data: QueryGetKnowledge_knowledge_data_attributes_categories_data[];
}

export interface QueryGetKnowledge_knowledge_data_attributes_stories_data_attributes {
  __typename: "Story";
  author: string | null;
  date: any | null;
}

export interface QueryGetKnowledge_knowledge_data_attributes_stories_data {
  __typename: "StoryEntity";
  attributes: QueryGetKnowledge_knowledge_data_attributes_stories_data_attributes | null;
}

export interface QueryGetKnowledge_knowledge_data_attributes_stories {
  __typename: "StoryRelationResponseCollection";
  data: QueryGetKnowledge_knowledge_data_attributes_stories_data[];
}

export interface QueryGetKnowledge_knowledge_data_attributes {
  __typename: "Knowledge";
  title: string;
  content: string | null;
  author: QueryGetKnowledge_knowledge_data_attributes_author | null;
  usersCanEdit: QueryGetKnowledge_knowledge_data_attributes_usersCanEdit | null;
  categories: QueryGetKnowledge_knowledge_data_attributes_categories | null;
  stories: QueryGetKnowledge_knowledge_data_attributes_stories | null;
  allUsersCanEdit: boolean | null;
}

export interface QueryGetKnowledge_knowledge_data {
  __typename: "KnowledgeEntity";
  id: string | null;
  attributes: QueryGetKnowledge_knowledge_data_attributes | null;
}

export interface QueryGetKnowledge_knowledge {
  __typename: "KnowledgeEntityResponse";
  data: QueryGetKnowledge_knowledge_data | null;
}

export interface QueryGetKnowledge {
  knowledge: QueryGetKnowledge_knowledge | null;
}

export interface QueryGetKnowledgeVariables {
  id: string;
}
