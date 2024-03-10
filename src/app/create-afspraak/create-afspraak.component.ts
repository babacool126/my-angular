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
  afspraak = { // Simplified model for the form's use
    soort: 0,
    datumTijd: new Date().toISOString().slice(0, 16), // Use for binding with the datetime-local input
    klantEmail: '',
    customerName: '', // Newly added
    customerPhoneNumber: '', // Newly added
    customerAddress: '', // Newly added
  };
  soortAfspraakKeys = Object.keys(SoortAfspraak).filter(key => !isNaN(Number(key)))
                         .map(key => ({ key: Number(key), value: SoortAfspraak[key as any] }));

  errorMessage: string | null = null;

  constructor(
    private afspraakService: AfspraakService,
    private klantService: KlantService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      this.errorMessage = "Veuillez remplir tous les champs requis.";
      return;
    }

    this.createAfspraak();
  }

  private createAfspraak(): void {
    const afspraakCreationPayload = {
      CustomerEmail: this.afspraak.klantEmail,
      CustomerName: this.afspraak.customerName,
      CustomerPhoneNumber: this.afspraak.customerPhoneNumber,
      CustomerAddress: this.afspraak.customerAddress,
      AppointmentType: this.afspraak.soort,
      AppointmentDateTime: new Date(this.afspraak.datumTijd).toISOString(),
    };

    this.afspraakService.createAfspraak(afspraakCreationPayload).subscribe({
      next: () => this.router.navigate(['/accueil']),
      error: (error) => this.errorMessage = "Erreur lors de la création du rendez-vous:  " + (error.error?.title || "l'adresse email existe déjà"),
    });
  }
}