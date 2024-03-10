import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AfspraakService } from '../services/afspraak.service';
import { KlantService } from '../services/klant.service';
import { Afspraak } from '../models/afspraak.model';
import { SoortAfspraak } from '../models/soort.model';

@Component({
  selector: 'app-create-afspraak',
  templateUrl: './create-afspraak.component.html',
  styleUrls: ['./create-afspraak.component.css']
})
export class CreateAfspraakComponent implements OnInit {
  afspraak: Afspraak = {
    afspraakId: 0,
    soort: 0, // Default or from form
    datumTijd: new Date(),
    klantEmail: '',// Default or from form
    // Klant details will be filled out in the form
  };
  datumTijdInput: string;
  soortAfspraakKeys = Object.keys(SoortAfspraak)
  .filter(key => !isNaN(Number(key))) // This filters out the numeric keys
  .map(key => ({ key: Number(key), value: SoortAfspraak[key as any] }));

  errorMessage: string | null = null;

  constructor(
    private afspraakService: AfspraakService,
    private klantService: KlantService,
    private router: Router
  ) {
    this.datumTijdInput = new Date().toISOString().slice(0, 16);
  }

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      this.errorMessage = "Please fill in all required fields.";
      return;
    }

    this.checkEmailAndCreateAfspraak(form.value.klantEmail);
  }

  private checkEmailAndCreateAfspraak(email: string): void {
    this.klantService.checkEmailExists(email).subscribe(emailExists => {
      if (!emailExists) {
        // Redirect to Klant creation page if email does not exist
        this.router.navigate(['/clients']); // Adjust the path as necessary
      } else {
        // Prepare the afspraak object for submission
        const afspraakForSubmission = {
          ...this.afspraak,
          datumTijd: this.afspraak.datumTijd.toISOString(), // Convert here to avoid type conflict
          klantEmail: email, // Ensure the email is included
          // Potentially remove afspraakId if it should not be sent during creation
        };

        this.afspraakService.createAfspraak(this.afspraak).subscribe({
          next: (newAfspraak) => {
            // Handle successful creation (e.g., redirect to a confirmation page or display a success message)
            this.router.navigate(['/accueil']); // Example redirection
          },
          error: (error) => {
            // Handle error scenario
            this.errorMessage = "Error creating afspraak: " + (error.error?.title || "Unknown error");
          }
        });
      }
    });
  }
}
