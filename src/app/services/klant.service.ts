import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Klant} from '../models/klant.model';

@Injectable({
  providedIn: 'root'
})
export class KlantService {
  private apiUrl = 'https://localhost:7030/api/klants'; // Adjust the port and path as necessary

  constructor(private http: HttpClient) { }

  // Fetch all clients
  getKlanten(): Observable<Klant[]> {
    return this.http.get<Klant[]>(this.apiUrl);
  }

  // Fetch a single client by ID
  getKlantById(id: number): Observable<Klant> {
    return this.http.get<Klant>(`${this.apiUrl}/${id}`);
  }

  // Create a new client
  createKlant(klant: Omit<Klant, 'Id'>): Observable<Klant> {
    return this.http.post<Klant>(this.apiUrl, klant);
  }

  // Update an existing client
  updateKlant(klant: Klant): Observable<Klant> {
    return this.http.put<Klant>(`${this.apiUrl}/${klant.id}`, klant);
  }

  // Delete a client by ID
  deleteKlant(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Check if an email exists
  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/EmailExists?email=${encodeURIComponent(email)}`);
  }
  
}
