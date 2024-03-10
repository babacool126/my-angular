import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KlantService } from '../services/klant.service';
import { Klant } from '../models/klant.model';

@Component({
  selector: 'app-list-klant',
  templateUrl: './list-klant.component.html',
  styleUrls: ['./list-klant.component.css']
})
export class ListKlantComponent implements OnInit {
  klanten: Klant[] = [];
  editingKlant: Klant | null = null;
  errorMessage: string | null = null;

  @ViewChild('editFormElement', { static: false }) editFormElement!: ElementRef;

  constructor(private klantService: KlantService) { }

  ngOnInit(): void {
    this.loadKlanten();
  }

  loadKlanten(): void {
    this.klantService.getKlanten().subscribe({
      next: klanten => this.klanten = klanten,
      error: err => this.errorMessage = 'Une erreur est survenue' + err.message
    });
  }

  startEdit(klant: Klant): void {
    this.editingKlant = { ...klant };
    setTimeout(() => this.scrollToEditForm(), 100); // Ensuring the form is visible before scrolling
  }

  submitEdit(form: NgForm): void {
    if (!this.editingKlant || !form.valid) {
      this.errorMessage = 'Veuillez remplir correctement tous les champs';
      return;
    }

    this.klantService.updateKlant(this.editingKlant).subscribe({
      next: () => {
        this.loadKlanten();
        this.cancelEdit();
        this.errorMessage = null; // Clear any error messages
      },
      error: err => {
        this.errorMessage = 'Adresse email déjà utilisée';
        console.error('Update klant error:', err);
      }
    });
  }

  cancelEdit(): void {
    this.editingKlant = null;
  }

  deleteKlant(id: number): void {
    const confirmation = confirm('Are you sure you want to delete this klant?');
    if (!confirmation) return;

    this.klantService.deleteKlant(id).subscribe({
      next: () => this.loadKlanten(),
      error: err => this.errorMessage = 'Failed to delete klant: ' + err.message
    });
  }

  scrollToEditForm(): void {
    this.editFormElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}


