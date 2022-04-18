/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePitch2Input = {
  id?: string | null,
  pitch_name: string,
  description?: string | null,
  pitchowner_name: string,
  available_slots: string,
  hourly_price: number,
  opening_hour: string,
  closing_hour: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  _version?: number | null,
};

export type ModelPitch2ConditionInput = {
  pitch_name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  pitchowner_name?: ModelStringInput | null,
  available_slots?: ModelStringInput | null,
  hourly_price?: ModelIntInput | null,
  opening_hour?: ModelStringInput | null,
  closing_hour?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPitch2ConditionInput | null > | null,
  or?: Array< ModelPitch2ConditionInput | null > | null,
  not?: ModelPitch2ConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Pitch2 = {
  __typename: "Pitch2",
  id?: string,
  pitch_name?: string,
  description?: string | null,
  pitchowner_name?: string,
  available_slots?: string,
  hourly_price?: number,
  opening_hour?: string,
  closing_hour?: string,
  createdAt?: string,
  updatedAt?: string,
  _version?: number,
  _deleted?: boolean | null,
  _lastChangedAt?: number,
};

export type UpdatePitch2Input = {
  id: string,
  pitch_name?: string | null,
  description?: string | null,
  pitchowner_name?: string | null,
  available_slots?: string | null,
  hourly_price?: number | null,
  opening_hour?: string | null,
  closing_hour?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  _version?: number | null,
};

export type DeletePitch2Input = {
  id: string,
  _version?: number | null,
};

export type ModelPitch2FilterInput = {
  id?: ModelIDInput | null,
  pitch_name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  pitchowner_name?: ModelStringInput | null,
  available_slots?: ModelStringInput | null,
  hourly_price?: ModelIntInput | null,
  opening_hour?: ModelStringInput | null,
  closing_hour?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPitch2FilterInput | null > | null,
  or?: Array< ModelPitch2FilterInput | null > | null,
  not?: ModelPitch2FilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelPitch2Connection = {
  __typename: "ModelPitch2Connection",
  items?:  Array<Pitch2 | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type CreatePitch2MutationVariables = {
  input?: CreatePitch2Input,
  condition?: ModelPitch2ConditionInput | null,
};

export type CreatePitch2Mutation = {
  createPitch2?:  {
    __typename: "Pitch2",
    id: string,
    pitch_name: string,
    description?: string | null,
    pitchowner_name: string,
    available_slots: string,
    hourly_price: number,
    opening_hour: string,
    closing_hour: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdatePitch2MutationVariables = {
  input?: UpdatePitch2Input,
  condition?: ModelPitch2ConditionInput | null,
};

export type UpdatePitch2Mutation = {
  updatePitch2?:  {
    __typename: "Pitch2",
    id: string,
    pitch_name: string,
    description?: string | null,
    pitchowner_name: string,
    available_slots: string,
    hourly_price: number,
    opening_hour: string,
    closing_hour: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeletePitch2MutationVariables = {
  input?: DeletePitch2Input,
  condition?: ModelPitch2ConditionInput | null,
};

export type DeletePitch2Mutation = {
  deletePitch2?:  {
    __typename: "Pitch2",
    id: string,
    pitch_name: string,
    description?: string | null,
    pitchowner_name: string,
    available_slots: string,
    hourly_price: number,
    opening_hour: string,
    closing_hour: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type SyncPitch2sQueryVariables = {
  filter?: ModelPitch2FilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncPitch2sQuery = {
  syncPitch2s?:  {
    __typename: "ModelPitch2Connection",
    items:  Array< {
      __typename: "Pitch2",
      id: string,
      pitch_name: string,
      description?: string | null,
      pitchowner_name: string,
      available_slots: string,
      hourly_price: number,
      opening_hour: string,
      closing_hour: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetPitch2QueryVariables = {
  id?: string,
};

export type GetPitch2Query = {
  getPitch2?:  {
    __typename: "Pitch2",
    id: string,
    pitch_name: string,
    description?: string | null,
    pitchowner_name: string,
    available_slots: string,
    hourly_price: number,
    opening_hour: string,
    closing_hour: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListPitch2sQueryVariables = {
  filter?: ModelPitch2FilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPitch2sQuery = {
  listPitch2s?:  {
    __typename: "ModelPitch2Connection",
    items:  Array< {
      __typename: "Pitch2",
      id: string,
      pitch_name: string,
      description?: string | null,
      pitchowner_name: string,
      available_slots: string,
      hourly_price: number,
      opening_hour: string,
      closing_hour: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreatePitch2Subscription = {
  onCreatePitch2?:  {
    __typename: "Pitch2",
    id: string,
    pitch_name: string,
    description?: string | null,
    pitchowner_name: string,
    available_slots: string,
    hourly_price: number,
    opening_hour: string,
    closing_hour: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdatePitch2Subscription = {
  onUpdatePitch2?:  {
    __typename: "Pitch2",
    id: string,
    pitch_name: string,
    description?: string | null,
    pitchowner_name: string,
    available_slots: string,
    hourly_price: number,
    opening_hour: string,
    closing_hour: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeletePitch2Subscription = {
  onDeletePitch2?:  {
    __typename: "Pitch2",
    id: string,
    pitch_name: string,
    description?: string | null,
    pitchowner_name: string,
    available_slots: string,
    hourly_price: number,
    opening_hour: string,
    closing_hour: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
