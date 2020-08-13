import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lijst } from '../models/lijst.model';

@Injectable({
  providedIn: 'root'
})
export class LijstService {

  constructor(private http: HttpClient) { }

  getLijst(): Observable<Lijst[]>{
    return this.http.get<Lijst[]>("https://localhost:44308/api/lijst");
  }

  addLijst(lijst: Lijst){
    return this.http.post<Lijst>("https://localhost:44308/api/lijst", lijst)
  }

  deleteLijst(lijstID: number) {
    return this.http.delete<Lijst>("https://localhost:44308/api/lijst/" + lijstID)
  }

  getLijstDetail(lijstID: number){
    return this.http.get<any>("https://localhost:44308/api/lijst/LijstDetail/" + lijstID)
  }

  updateLijst(lijstID: number, lijst: Lijst) {
    return this.http.put<Lijst>("https://localhost:44308/api/lijst/" + lijstID, lijst)
  }
}
