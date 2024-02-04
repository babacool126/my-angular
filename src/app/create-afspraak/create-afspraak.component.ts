import { Component } from '@angular/core';
import { AfspraakService } from '../services/afspraak.service';
import { Afspraak, SoortAfspraak } from '../models/afspraak.model';

@Component({
  selector: 'app-create-afspraak',
  templateUrl: './create-afspraak.component.html',
  styleUrls: ['./create-afspraak.component.css']
})
export class CreateAfspraakComponent {
  afspraak: Afspraak = {
    Id: 0,
    KlantId: 0, // Assuming you have a way to set this, perhaps from a logged-in user session
    Soort: SoortAfspraak.Inspectie,
    DatumTijd: new Date()
};

constructor(private afspraakService: AfspraakService) { }

onSubmit(): void {
  this.afspraakService.createAfspraak(this.afspraak).subscribe({
    next: (afspraak) => console.log(afspraak),
    error: (error: any) => console.error(error)
  });
}
}