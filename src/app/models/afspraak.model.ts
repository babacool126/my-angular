// src/app/models/afspraak.model.ts

import {Klant} from './klant.model'

export interface Afspraak {
  id: number;
  klantId: number;
  klant: Klant;
  soort: string; // Assuming you manage the enumeration as a string on the front end
  datumTijd: Date;
}