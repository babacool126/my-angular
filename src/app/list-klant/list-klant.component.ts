import { Component, OnInit } from '@angular/core';
import { KlantService } from '../services/klant.service';
import { Klant } from '../models/klant.model';

@Component({
  selector: 'app-list-klant',
  templateUrl: './list-klant.component.html',
  styleUrls: ['./list-klant.component.css']
})
export class ListKlantComponent implements OnInit {
  klanten: Klant[] = [];

  constructor(private klantService: KlantService) { }

  ngOnInit(): void {
    this.loadKlanten();
  }

  loadKlanten(): void {
    this.klantService.getKlanten().subscribe(klanten => {
        console.log(klanten); // This will show you the data received from the backend
        this.klanten = klanten;
    });
}
  deleteKlant(id: number): void {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce client?');
    if (confirmation) {
      this.klantService.deleteKlant(id).subscribe(() => {
        this.loadKlanten(); // Refresh the list after deletion
      });
    }
  }
}
