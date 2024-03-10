import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KlantService } from '../services/klant.service';
import { Klant } from '../models/klant.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-klant',
  templateUrl: './klant.component.html',
  styleUrls: ['./klant.component.css']
})
export class KlantComponent implements OnInit {
  klanten: Klant[] = [];
  newKlant: Klant = {
    id: 0,
    naam: '',
    email: '',
    telefoonnummer: '',
    adres: ''
  };
  isEditing = false;
  errorMessage: string | null = null; 


  constructor(private klantService: KlantService) { }

  ngOnInit(): void {
    this.loadKlanten();
  }

  loadKlanten(): void {
    this.klantService.getKlanten().subscribe({
      next: klanten => this.klanten = klanten,
      error: (err: HttpErrorResponse) => this.errorMessage = 'Échec du chargement des clients : ' + err.message
    });
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      this.errorMessage = 'Veuillez vous assurer que tous les champs sont correctement remplis.';
      return;
    }

    this.errorMessage = null; // Reset error message
  
   // Assuming this method now focuses solely on adding new klanten
   this.klantService.checkEmailExists(this.newKlant.email).subscribe(emailExists => {
    if (emailExists) {
      this.errorMessage = 'Cette adresse e-mail est déjà utilisée.';
    } else {
      const klantToCreate = { ...this.newKlant };
      delete klantToCreate.id; // Remove id for creation
      this.klantService.createKlant(klantToCreate).subscribe({
        next: () => {
          this.loadKlanten();
          this.resetForm(form);
        },
        error: (err: HttpErrorResponse) => this.errorMessage = 'Échec de la création du client : ' + err.message
      });
    }
  });
}
  resetForm(form: NgForm): void {
    form.reset();
    this.newKlant = { id: 0, naam: '', email: '', telefoonnummer: '', adres: ''};
    this.isEditing = false;
  }
}
