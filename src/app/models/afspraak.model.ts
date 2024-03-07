// src/app/models/afspraak.model.ts
    
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
  