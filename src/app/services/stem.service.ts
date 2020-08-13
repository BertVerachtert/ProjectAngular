import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stem } from '../models/stem.model';

@Injectable({
  providedIn: 'root'
})
export class StemService {

  constructor(private http: HttpClient) { }

  checkStem(lijstID: number, gebruikerID: number){
    return this.http.get<boolean>('https://localhost:44308/api/Stem/checkStem?lijstid=' + lijstID + "&gebruikerid=" + gebruikerID )
  }

  addStem(stem: Stem){
    return this.http.post<Stem>("https://localhost:44308/api/stem", stem);
  }
}
