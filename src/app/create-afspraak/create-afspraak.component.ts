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
    KlantId: 0,
    Soort: SoortAfspraak.Inspectie,
    DatumTijd: new Date()
};

error: string | null = null; // Declare the error property here

constructor(private afspraakService: AfspraakService) { }

onSubmit(): void {

  // Prepare the afspraak object, ensuring DatumTijd is a string for the submission
  if (this.afspraak.DatumTijd instanceof Date) {
    // Convert DatumTijd to a string, but directly manipulate the afspraak object for submission
    const afspraakForSubmission = { ...this.afspraak, DatumTijd: this.afspraak.DatumTijd.toISOString() };

    console.log('Submitting:', this.afspraak); // Log the afspraak object being submitted

    this.afspraakService.createAfspraak(afspraakForSubmission as any).subscribe({
      next: (afspraak) => {
        console.log('Response from server:',afspraak);
        this.error = null; // Clear any previous error message
        // Redirect the user or clear the form here
      },
      error: (error: any) => {
        console.error('Error submitting form:',error);
        this.error = 'Une erreur est survenue lors de la création du rendez-vous.'; // Set the error message
      }
    });
  }
}
}