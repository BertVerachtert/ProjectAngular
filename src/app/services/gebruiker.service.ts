import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gebruiker } from '../models/gebruiker.model';
import { Dashboard } from '../models/dashboard.viewModel';

@Injectable({
  providedIn: 'root'
})
export class GebruikerService {

  constructor(private http: HttpClient) { }

  getGebruiker(gebruikerID): Observable<Gebruiker> {
    return this.http.get<Gebruiker>('https://localhost:44308/api/Gebruiker/' + gebruikerID);
  }

  getGebruikers(): Observable<Gebruiker[]> {
    return this.http.get<Gebruiker[]>("https://localhost:44308/api/gebruiker", {
    headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
    });
  }

  registreer(gebruiker: Gebruiker) {
    return this.http.post<Gebruiker>('https://localhost:44308/api/Gebruiker', gebruiker);
  }

  checkUsername(username: string) {
    return this.http.get<boolean>('https://localhost:44308/api/Gebruiker/checkUsername/' + username);
  }

  checkEmail(email: string){
    return this.http.get<boolean>('https://localhost:44308/api/Gebruiker/checkEmail/' + email)
  }

  getDashboard(GebruikerID: number) : Observable<any>{
    return this.http.get<any>('https://localhost:44308/api/Gebruiker/dashboard/' + GebruikerID)
  }
}
