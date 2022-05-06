import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Reservation {
  readonly id: string;
  readonly pitch_id?: string;
  readonly reserver_username?: string;
  readonly reservation_date?: string;
  constructor(init: ModelInit<Reservation>);
  static copyOf(source: Reservation, mutator: (draft: MutableModel<Reservation>) => MutableModel<Reservation> | void): Reservation;
}

export declare class Pitch2 {
  readonly id: string;
  readonly pitch_name: string;
  readonly description?: string;
  readonly pitchowner_name: string;
  readonly hourly_price: number;
  readonly opening_hour: string;
  readonly closing_hour: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly username?: string;
  readonly available_slots?: (string | null)[];
  constructor(init: ModelInit<Pitch2>);
  static copyOf(source: Pitch2, mutator: (draft: MutableModel<Pitch2>) => MutableModel<Pitch2> | void): Pitch2;
}