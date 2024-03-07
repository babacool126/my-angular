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
    Naam: '',
    Email: '',
    Telefoonnummer: ''
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

    if (this.isEditing) {
      this.klantService.updateKlant(this.newKlant).subscribe(() => {
        this.loadKlanten();
        this.resetForm(form);
      });
    } else {
      // Assuming createKlant might need adjustment to match the expected payload,
      // as it looks like it should not include an 'id' based on its definition in the service:
      // createKlant(klant: Omit<Klant, 'Id'>): Observable<Klant>
      // You might need to adjust the object sent to createKlant to exclude the 'id' if it's set to a default value like 0.
      const klantToCreate = { ...this.newKlant };
      delete klantToCreate.id; // Assuming 'id' is named 'Id' in the model, adjust as necessary
      this.klantService.createKlant(klantToCreate as Omit<Klant, 'Id'>).subscribe(() => {
        this.loadKlanten();
        this.resetForm(form);
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
    this.newKlant = { id: 0, Naam: '', Email: '', Telefoonnummer: '' };
    this.isEditing = false;
  }
}
