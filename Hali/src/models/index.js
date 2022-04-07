// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Pitch } = initSchema(schema);

export {
  Pitch
};