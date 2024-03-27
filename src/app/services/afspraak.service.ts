// src/app/services/afspraak.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Afspraak } from '../models/afspraak.model';
import { AfspraakUpdate } from '../models/afspraak-update.model';

@Injectable({
  providedIn: 'root'
})
export class AfspraakService {
  private apiUrl = 'https://localhost:7030/api/afspraaks'; // Adjust the port as necessary
  private klantApiUrl = 'https://localhost:7030/api/klants';

  constructor(private http: HttpClient) { }

  // Create a new appointment
  createAfspraak(afspraak: any): Observable<Afspraak> {
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
  updateAfspraak(afspraakId: number, updatePayload: any): Observable<any> { // Consider typing updatePayload more specifically if possible
    return this.http.put<any>(`${this.apiUrl}/${afspraakId}`, updatePayload);
  }
  // Delete an appointment by ID
  deleteAfspraak(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  // Check if an email exists (wrapper around KlantService)
  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.klantApiUrl}/EmailExists?email=${encodeURIComponent(email)}`);
  }
}