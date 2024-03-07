import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { KlantService } from '../services/klant.service';
import { Klant } from '../models/klant.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list-klant',
  templateUrl: './list-klant.component.html',
  styleUrls: ['./list-klant.component.css']
})
export class ListKlantComponent implements OnInit {
  klanten: Klant[] = [];
  editingKlant: Klant | null = null; // Currently being edited klant

  @ViewChild('editFormElement') editFormElement!: ElementRef; // ViewChild for scrolling to form

  constructor(private klantService: KlantService) { }

  ngOnInit(): void {
    this.loadKlanten();
  }

  loadKlanten(): void {
    this.klantService.getKlanten().subscribe(klanten => this.klanten = klanten);
  }

  startEdit(klant: Klant): void {
    console.log("Editing klant:", klant); // Check if klant is passed correctly
    this.editingKlant = { ...klant };
    console.log("editingKlant after set:", this.editingKlant); // Verify editingKlant is set
    this.scrollToEditForm(); // Scroll to edit form
  }

  submitEdit(form: NgForm): void {
    if (this.editingKlant && form.valid) {
      this.klantService.updateKlant(this.editingKlant).subscribe(() => {
        this.loadKlanten();
        this.cancelEdit(); // Reset editing state
      });
    }
  }

  cancelEdit(): void {
    this.editingKlant = null;
  }

  deleteKlant(id: number): void {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce client?');
    if (confirmation) {
      this.klantService.deleteKlant(id).subscribe(() => {
        this.loadKlanten();
      });
    }
  }
  scrollToEditForm() {
    this.editFormElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}

