/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncPitch2s = /* GraphQL */ `
  query SyncPitch2s(
    $filter: ModelPitch2FilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPitch2s(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        pitch_name
        description
        pitchowner_name
        available_slots
        hourly_price
        opening_hour
        closing_hour
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getPitch2 = /* GraphQL */ `
  query GetPitch2($id: ID!) {
    getPitch2(id: $id) {
      id
      pitch_name
      description
      pitchowner_name
      available_slots
      hourly_price
      opening_hour
      closing_hour
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listPitch2s = /* GraphQL */ `
  query ListPitch2s(
    $filter: ModelPitch2FilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPitch2s(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        pitch_name
        description
        pitchowner_name
        available_slots
        hourly_price
        opening_hour
        closing_hour
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
