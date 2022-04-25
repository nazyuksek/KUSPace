/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPitch2 = /* GraphQL */ `
  mutation CreatePitch2(
    $input: CreatePitch2Input!
    $condition: ModelPitch2ConditionInput
  ) {
    createPitch2(input: $input, condition: $condition) {
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
    }
  }
`;
export const updatePitch2 = /* GraphQL */ `
  mutation UpdatePitch2(
    $input: UpdatePitch2Input!
    $condition: ModelPitch2ConditionInput
  ) {
    updatePitch2(input: $input, condition: $condition) {
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
    }
  }
`;
export const deletePitch2 = /* GraphQL */ `
  mutation DeletePitch2(
    $input: DeletePitch2Input!
    $condition: ModelPitch2ConditionInput
  ) {
    deletePitch2(input: $input, condition: $condition) {
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
    }
  }
`;
