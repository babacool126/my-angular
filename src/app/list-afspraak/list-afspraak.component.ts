import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AfspraakService } from '../services/afspraak.service';
import { Afspraak } from '../models/afspraak.model';
import { SoortAfspraak } from '../models/soort.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list-afspraak',
  templateUrl: './list-afspraak.component.html',
  styleUrls: ['./list-afspraak.component.css']
})
export class ListAfspraakComponent implements OnInit {
  afspraken: Afspraak[] = [];
  error: string | null = null;
  SoortAfspraak = SoortAfspraak;
  editingAfspraak: Afspraak | null = null; // Currently being edited afspraak

  @ViewChild('editFormElement') editFormElement!: ElementRef; // ViewChild for scrolling to form

  constructor(private afspraakService: AfspraakService) { }

  ngOnInit(): void {
    this.loadAfspraken();
  }

  loadAfspraken(): void {
    this.afspraakService.getAfspraken().subscribe({
      next: (data) => this.afspraken = data,
      error: (err) => this.error = 'Failed to load appointments: ' + err.message
    });
  }

  startEdit(afspraak: Afspraak): void {
    this.editingAfspraak = { ...afspraak };
    this.scrollToEditForm();
  }

  submitEdit(form: NgForm): void {
    if (this.editingAfspraak && form.valid) {
      this.afspraakService.updateAfspraak(this.editingAfspraak).subscribe(() => {
        this.loadAfspraken();
        this.cancelEdit(); // Reset editing state
      });
    }
  }

  cancelEdit(): void {
    this.editingAfspraak = null;
  }

  deleteAfspraak(afspraakId: number): void {
    if(confirm("Are you sure you want to delete this appointment?")) {
      this.afspraakService.deleteAfspraak(afspraakId).subscribe({
        next: () => {
          this.loadAfspraken(); // Reload the list after deletion
        },
        error: (err) => this.error = 'Failed to delete appointment: ' + err.message
      });
    }
  }

  getSoortString(soort: any): string {
    return SoortAfspraak[soort]
  }
  scrollToEditForm() {
    this.editFormElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}