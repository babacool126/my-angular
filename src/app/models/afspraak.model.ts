// src/app/models/afspraak.model.ts
  
  export enum SoortAfspraak {
    Inspectie = 1,
    Reparatie = 2,
    Onderhoud = 3
  }
  
  export interface Afspraak {
    id?: number,
    klantId?: number;
    klant: {
      naam: string;
      email: string;
      telefoonnummer: string;
    } | undefined;
    soort: number;
    datumTijd: string;
  }
  