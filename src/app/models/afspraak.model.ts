// src/app/models/afspraak.model.ts

export interface Klant {
    Id: number;
    Naam: string;
    Email: string;
    Telefoonnummer: string;
  }
  
  export enum SoortAfspraak {
    Inspectie,
    Reparatie,
    Onderhoud
  }
  
  export interface Afspraak {
    Id: number;
    KlantId: number;
    Klant?: Klant;
    Soort: SoortAfspraak;
    DatumTijd: Date;
  }
  