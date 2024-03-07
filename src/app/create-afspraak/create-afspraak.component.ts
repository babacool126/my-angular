import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AfspraakService } from '../services/afspraak.service';
import { Afspraak } from '../models/afspraak.model';
import { Klant } from '../models/klant.model';
import { SoortAfspraak } from '../models/soort.model';

@Component({
  selector: 'app-create-afspraak',
  templateUrl: './create-afspraak.component.html',
  styleUrls: ['./create-afspraak.component.css']
})
export class CreateAfspraakComponent implements OnInit {
  afspraakForm: FormGroup;
  error: string | null = null;
  soortAfspraakKeys = Object.keys(SoortAfspraak).filter(k => !isNaN(Number(k))).map(k => ({ key: k, value: SoortAfspraak[k as any] }));

  constructor(
    private fb: FormBuilder,
    private afspraakService: AfspraakService
  ) {
    this.afspraakForm = this.fb.group({
      klantId: [''], // Optional: User inputs klantId for an existing klant
      klant: this.fb.group({ // Optional: For creating a new klant
        naam: [''],
        email: [''],
        telefoonnummer: ['']
      }),
      soort: ['', Validators.required],
      datumTijd: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const formValue = this.afspraakForm.value;

    const datumTijdISO = new Date(formValue.datumTijd).toISOString();

    // Directly create the Afspraak object expected by the service
    const afspraak: Afspraak = {
      klantId: formValue.klantId ? Number(formValue.klantId) : undefined, // Convert to number, if present
      klant: formValue.klantId ? undefined : { // Include klant only if klantId is not provided
          naam: formValue.klant.naam,
          email: formValue.klant.email,
          telefoonnummer: formValue.klant.telefoonnummer
      },
      soort: Number(formValue.soort),
      datumTijd: datumTijdISO,
    }
    // Call the service with the correctly structured Afspraak object
    this.afspraakService.createAfspraak(afspraak).subscribe({
        next: response => console.log('Afspraak created successfully.', response),
        error: err => this.error = `Error creating afspraak: ${err.message || err}`
    });
  }
}







