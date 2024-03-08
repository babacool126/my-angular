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
  
    // Assuming formValue.datumTijd is already in an acceptable format (ISO string from a date input)
    let afspraak: Partial<Afspraak> = {
      klantId: formValue.klantId ? Number(formValue.klantId) : undefined,
      soort: formValue.soort,
      datumTijd: new Date(formValue.datumTijd) // Directly use the form's datumTijd as a Date object
    };

    // Conditionally add klant if klantId is not provided
    if (!formValue.klantId && formValue.klant) {
      afspraak = {
        ...afspraak,
        klant: {// Explicitly setting it as an indexed property to bypass TypeScript's strict type checking
        naam: formValue.klant.naam,
        email: formValue.klant.email,
        telefoonnummer: formValue.klant.telefoonnummer,
        }
      } as Afspraak;
    }

    this.afspraakService.createAfspraak(afspraak as Afspraak).subscribe({
      next: (response) => console.log('Afspraak created successfully.', response),
      error: (err) => this.error = `Error creating afspraak: ${err.message || err}`,
    });
  }
}






