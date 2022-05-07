// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { MatchAnnounce, Player, Reservation, Pitch2 } = initSchema(schema);

export {
  MatchAnnounce,
  Player,
  Reservation,
  Pitch2
};