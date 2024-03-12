import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AfspraakService } from '../services/afspraak.service';
import { KlantService } from '../services/klant.service';
import { Afspraak } from '../models/afspraak.model';
import { SoortAfspraak } from '../models/soort.model';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';

@Component({
  selector: 'app-create-afspraak',
  templateUrl: './create-afspraak.component.html',
  styleUrls: ['./create-afspraak.component.css']
})
export class CreateAfspraakComponent implements OnInit {
  afspraak = {
    soort: 0,
    datumTijd: '',
    klantEmail: '',
    customerName: '', 
    customerPhoneNumber: '',
    customerAddress: '',
  };
  soortAfspraakKeys = Object.keys(SoortAfspraak).filter(key => !isNaN(Number(key)))
                         .map(key => ({ key: Number(key), value: SoortAfspraak[key as any] }));

  errorMessage: string | null = null;
  minDate: Date = new Date();
  maxAppointmentsPerDay: number = 4; 

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

     // Ensure the date is in the future and on a weekday in the client side as an initial check
     const selectedDate = new Date(this.afspraak.datumTijd);
     const currentDateTime = new Date();
     currentDateTime.setSeconds(0);

     if (selectedDate <= currentDateTime) {
      this.errorMessage = "La date doit être un jour de semaine.";
      return;
    }

    // Check if the appointment is on a weekend (Saturday or Sunday)
    if (selectedDate.getDay() === 6 || selectedDate.getDay() === 0) {
      this.errorMessage = "Les rendez-vous ne peuvent être planifiés que du lundi au vendredi.";
      return;
  }

     // Check if the appointment is within working hours (8 AM to 6 PM)
    const appointmentTime = selectedDate.getHours();
    if (appointmentTime < 8 || appointmentTime >= 18) {
      this.errorMessage = "Les rendez-vous ne peuvent être planifiés qu'entre 8 h et 18 h.";
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
      next: () => {
        this.router.navigate(['/accueil']); // Navigate on success
      },
      error: (error) => {
        // More explicit error handling
        const errorMessage = error.error?.message || "Une erreur est survenue. Veuillez réessayer.";
        this.errorMessage = `Erreur lors de la création du rendez-vous: ${errorMessage}`;
      }
    });
  }
}