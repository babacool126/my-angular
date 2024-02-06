import { Component } from '@angular/core';
import { AfspraakService } from '../services/afspraak.service';
import { Afspraak, SoortAfspraak } from '../models/afspraak.model';

@Component({
  selector: 'app-create-afspraak',
  templateUrl: './create-afspraak.component.html',
  styleUrls: ['./create-afspraak.component.css']
})
export class CreateAfspraakComponent {
  afspraak: Afspraak = {
    Id: 0,
    KlantId: 0, // Assuming you have a way to set this, perhaps from a logged-in user session
    Soort: SoortAfspraak.Inspectie,
    DatumTijd: new Date()
};

error: string | null = null; // Declare the error property here

constructor(private afspraakService: AfspraakService) { }

onSubmit(): void {
  this.afspraakService.createAfspraak(this.afspraak).subscribe({
    next: (afspraak) => {
      console.log(afspraak);
      // Optionally, clear the form or redirect the user
      this.error = null; // Clear any previous error message
    },
    error: (error: any) => {
      console.error(error);
      this.error = 'Une erreur est survenue lors de la création du rendez-vous.'; // Set the error message
    }
  });
}
}