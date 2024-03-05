// src/app/create-afspraak/create-afspraak.component.ts
import { Component } from '@angular/core';
import { AfspraakService } from '../services/afspraak.service';
import { KlantService } from '../services/klant.service'; // Import KlantService
import { Afspraak, SoortAfspraak, Klant } from '../models/afspraak.model';

@Component({
  selector: 'app-create-afspraak',
  templateUrl: './create-afspraak.component.html',
  styleUrls: ['./create-afspraak.component.css']
})
export class CreateAfspraakComponent {
  klant: Omit<Klant, 'Id'> = {
    Naam: '',
    Email: '',
    Telefoonnummer: ''
  };

  afspraak: Omit<Afspraak, 'Id' | 'KlantId'> = {
    Soort: SoortAfspraak.Inspectie,
    DatumTijd: new Date()
  };
  error: string | null = null;

  soortAfspraakKeys = Object.values(SoortAfspraak);

  constructor(private afspraakService: AfspraakService, private klantService: KlantService) { } // Inject KlantService

  onSubmit(): void {
    // Convert DatumTijd to a string in ISO format as expected by the backend


    // Use the form-bound klant object directly
    this.klantService.createKlant(this.klant).subscribe({
      next: (createdKlant) => {
        // Successfully created klant, now create afspraak with the KlantId
        const afspraakToCreate = {
          KlantId: createdKlant.Id, // Assign the newly created Klant's Id to the afspraak
        };

        this.afspraakService.createAfspraak(afspraakToCreate as Afspraak).subscribe({
          next: (afspraak) => {
            console.log('Appointment created', afspraak);
            this.error = null; // Clear any previous error message
            // Here you could navigate to another page or reset the form as needed
            // e.g., this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Error creating appointment:', error);
            this.error = 'An error occurred while creating the appointment.';
          }
        });
      },
      error: (error) => {
        console.error('Error creating client:', error);
        this.error = 'An error occurred while creating the client.';
      }
    });
  }
}
