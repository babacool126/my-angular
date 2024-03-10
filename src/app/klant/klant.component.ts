import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KlantService } from '../services/klant.service';
import { Klant } from '../models/klant.model'; // Ensure this model matches your ASP.NET Core model

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
  isEditing = false; // Track if we are adding a new klant or editing an existing one


  constructor(private klantService: KlantService) { }

  ngOnInit(): void {
    this.loadKlanten();
  }

  loadKlanten(): void {
    this.klantService.getKlanten().subscribe(klanten => this.klanten = klanten);
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) return;
  
    // Check if we are editing an existing klant or adding a new one
    if (this.isEditing) {
      // Update logic remains the same
      this.klantService.updateKlant(this.newKlant).subscribe(() => {
        this.loadKlanten();
        this.resetForm(form);
      });
    } else {
      // New klant logic with email check
      this.klantService.checkEmailExists(this.newKlant.email).subscribe(emailExists => {
        if (emailExists) {
          alert('This email address is already in use');
        } else {
          // Email doesn't exist, proceed with creating the new klant
          const klantToCreate = { ...this.newKlant };
          delete klantToCreate.id; // Remove the id field as it's not needed for creation
          this.klantService.createKlant(klantToCreate).subscribe(() => {
            this.loadKlanten();
            this.resetForm(form);
          });
        }
      });
    }
  }

  editKlant(klant: Klant): void {
    this.newKlant = { ...klant };
    this.isEditing = true;
  }

  deleteKlant(id: number): void {
    const confirmation = confirm('Are you sure you want to delete this customer?');
    if (confirmation) {
      this.klantService.deleteKlant(id).subscribe(() => {
        this.loadKlanten(); // Reload the list after deleting
      });
    }
  }
  
  resetForm(form: NgForm): void {
    form.reset();
    this.newKlant = { id: 0, naam: '', email: '', telefoonnummer: '', adres: ''};
    this.isEditing = false;
  }
}
