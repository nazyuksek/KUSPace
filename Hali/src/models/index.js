// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Pitch2 } = initSchema(schema);

export {
  Pitch2
};