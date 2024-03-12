// src/app/models/afspraak.model.ts

import {Klant} from './klant.model'

export interface Afspraak {
  afspraakId: number;
  klantId?: number;
  klantNaam?: string;
  klantEmail: string;
  klantTelefoonnummer?: string;
  klantAdres?: string;
  soort: number;
  datumTijd: Date;
}