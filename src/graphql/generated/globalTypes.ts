/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ENUM_BOARD_STATUS {
  concluded = "concluded",
  inProgress = "inProgress",
  notInitiated = "notInitiated",
}

export enum ENUM_PROJECTUSERROLE_ROLE {
  member = "member",
  productOwner = "productOwner",
  scrumMaster = "scrumMaster",
}

export enum ENUM_USERSPERMISSIONSUSER_TYPE {
  admin = "admin",
  default = "default",
}

export interface UsersPermissionsRegisterInput {
  username: string;
  email: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
