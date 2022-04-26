// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Reservation, Pitch2 } = initSchema(schema);

export {
  Reservation,
  Pitch2
};