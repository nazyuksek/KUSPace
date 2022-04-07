import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Pitch {
  readonly id: string;
  readonly pitch_name: string;
  readonly description?: string;
  readonly pitchowner_name: string;
  readonly available_slots: string;
  readonly hourly_price: number;
  readonly opening_hour: string;
  readonly closing_hour: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  constructor(init: ModelInit<Pitch>);
  static copyOf(source: Pitch, mutator: (draft: MutableModel<Pitch>) => MutableModel<Pitch> | void): Pitch;
}