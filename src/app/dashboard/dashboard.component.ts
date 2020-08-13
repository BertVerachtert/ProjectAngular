import { Component, OnInit } from '@angular/core';
import { GebruikerService } from '../services/gebruiker.service';
import { Dashboard } from '../models/dashboard.viewModel';
import { Lijst } from '../models/lijst.model';
import { Stem } from '../models/stem.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  gebruikerID: number = Number(sessionStorage.getItem('gebruikerID'));
  curDashboard : Dashboard;
  BeheerderLijst : Lijst[];
  UStemmen : Stem[];
  vandaag : Date;
  begonnen : boolean = false;

  constructor(private _gebruikerService : GebruikerService, private router: Router) {
   }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.dashboard(this.gebruikerID);
  }

  checkEindDatum(einddatum) {
    this.vandaag = new Date();
    var eind : Date = new Date(einddatum);
    if(eind >= this.vandaag){
      return false;
    } else {
      return true;
    }
  }

  checkStartDatum(startdatum, einddatum) {
    this.vandaag = new Date();
    var start : Date = new Date(startdatum);
    var eind : Date = new Date(einddatum);
    if (start > this.vandaag || eind > this.vandaag){
      return true;
    } else {
      return false;
    }
  }

  resultLijst(lijstID) {
    sessionStorage.setItem("resultID", lijstID);
    this.router.navigate(['resultaatLijst'], {replaceUrl: true})
  }

  editLijst(lijstID) {
    sessionStorage.setItem("editID", lijstID);
    this.router.navigate(['editLijst'], {replaceUrl: true})
  }

  private dashboard(GebruikerID: number){
    this._gebruikerService.getDashboard(GebruikerID).subscribe(result => {
      this.curDashboard = result;
      this.BeheerderLijst = this.curDashboard.beheerderLijsten;
      this.UStemmen = this.curDashboard.uitStemmen;
    },
    HttpErrorResponse => {
      console.log(HttpErrorResponse);
    });
  }
}
