import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from 'src/app/models/login.model';
import { Gebruiker } from 'src/app/models/gebruiker.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  isLoggedin = new BehaviorSubject(false);

  constructor(private _httpClient: HttpClient) { }

  authenticate(login: Login): Observable<Gebruiker> {
    return this._httpClient.post<Gebruiker>("https://localhost:44308/api/Gebruiker/authenticate", login);
  }
}