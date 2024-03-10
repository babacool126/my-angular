import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AfspraakService } from '../services/afspraak.service';
import { KlantService } from '../services/klant.service';
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
  soortAfspraakKeys = Object.keys(SoortAfspraak)
    .filter(key => !isNaN(Number(key)))
    .map(key => ({ key: Number(key), value: SoortAfspraak[key as any] }));

  editingAfspraak: Afspraak | null = null; // Currently being edited afspraak

  @ViewChild('editFormElement') editFormElement!: ElementRef; // ViewChild for scrolling to form

  constructor(private afspraakService: AfspraakService, private klantService: KlantService) { }

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
    if(afspraak) {
    this.editingAfspraak = { ...afspraak };
    this.scrollToEditForm();
    }else {
      console.error('Afspraak is null.');
    }
  }

  submitEdit(form: NgForm): void {
    console.log('submitEdit called with form validity:', form.valid);

    if (this.editingAfspraak && form.valid) {
      // Update logic
      // Check if the email is being edited to already existing one
      this.klantService.checkEmailExists(this.editingAfspraak.klantEmail).subscribe(emailExists => {
        console.log('Email exists check result:', emailExists);

        if (emailExists) {
          console.log('Alert: This email address is already in use');
          alert('This email address is already in use');
        } else {
          // Email doesn't exist, proceed with updating the afspraak
          this.afspraakService.updateAfspraak(this.editingAfspraak!).subscribe(() => {
            console.log('Afspraak updated successfully');
            this.loadAfspraken();
            this.cancelEdit(); // Reset editing state
          },
          error => {
            console.error('Error updating afspraak:', error); // Log any errors during update
          });
        }
      },
      error => {
        console.error('Error checking email exists:', error); // Log any errors during email check
      });
    } else {
      console.log('Form is invalid or editingAfspraak is null');
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

  getSoortString(soortvalue: number): string {
    return SoortAfspraak[soortvalue] || "Unknown";
  }
  scrollToEditForm() {
    this.editFormElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}