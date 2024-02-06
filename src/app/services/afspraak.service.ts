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

  // Create a new appointment
  createAfspraak(afspraak: Afspraak): Observable<Afspraak> {
    return this.http.post<Afspraak>(this.apiUrl, afspraak);
  }

  // Get all appointments
  getAfspraken(): Observable<Afspraak[]> {
    return this.http.get<Afspraak[]>(this.apiUrl);
  }

  // Get a single appointment by ID
  getAfspraakById(id: number): Observable<Afspraak> {
    return this.http.get<Afspraak>(`${this.apiUrl}/${id}`);
  }

  // Update an existing appointment
  updateAfspraak(afspraak: Afspraak): Observable<Afspraak> {
    return this.http.put<Afspraak>(`${this.apiUrl}/${afspraak.Id}`, afspraak);
  }

  // Delete an appointment by ID
  deleteAfspraak(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}