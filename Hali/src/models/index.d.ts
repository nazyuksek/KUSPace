import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class MatchAnnounce {
  readonly id: string;
  readonly hour: string;
  readonly pitch_name: string;
  readonly number_of_attendees?: number;
  readonly attendees_list?: (string | null)[];
  readonly total_capacity?: number;
  readonly announcement_name: string;
  constructor(init: ModelInit<MatchAnnounce>);
  static copyOf(source: MatchAnnounce, mutator: (draft: MutableModel<MatchAnnounce>) => MutableModel<MatchAnnounce> | void): MatchAnnounce;
}

export declare class Player {
  readonly id: string;
  readonly username?: string;
  readonly skill?: number;
  readonly district?: string;
  readonly birthdate?: string;
  readonly reservations?: (string | null)[];
  readonly email?: string;
  readonly pitches_played?: (string | null)[];
  readonly realname?: string;
  constructor(init: ModelInit<Player>);
  static copyOf(source: Player, mutator: (draft: MutableModel<Player>) => MutableModel<Player> | void): Player;
}

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
  readonly city?: string;
  readonly district?: string;
  readonly province?: string;
  readonly address?: string;
  readonly email?: string;
  readonly rating?: number;
  constructor(init: ModelInit<Pitch2>);
  static copyOf(source: Pitch2, mutator: (draft: MutableModel<Pitch2>) => MutableModel<Pitch2> | void): Pitch2;
}