// src/app/services/afspraak.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Afspraak } from '../models/afspraak.model';

@Injectable({
  providedIn: 'root'
})
export class AfspraakService {
  private apiUrl = 'http://localhost:7030/api/afspraaks'; // Adjust the port as necessary

  constructor(private http: HttpClient) { }

  createAfspraak(afspraak: Afspraak): Observable<Afspraak> {
    return this.http.post<Afspraak>(this.apiUrl, afspraak);
  }

  // Implement other methods as necessary (get, update, delete)
}