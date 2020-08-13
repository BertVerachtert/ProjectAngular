import { Component, OnInit } from '@angular/core';
import { LijstService } from '../services/lijst.service';
import { Lijst } from '../models/lijst.model';
import { Router } from '@angular/router';
import { StemService } from '../services/stem.service';
import { Stem } from '../models/stem.model';
import { NgbDateNativeUTCAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lijst-detail',
  templateUrl: './lijst-detail.component.html',
  styleUrls: ['./lijst-detail.component.scss']
})
export class LijstDetailComponent implements OnInit {

  lijstID : number;
  lijst : Lijst;
  itemID : number;
  gebruikerID: number;
  leeg : boolean = false;
  alGestemd : boolean = false;
  voorbij : boolean = false;
  bezig : boolean = false;
  vandaag : Date;

  constructor(private _lijstService: LijstService, private router: Router, private _stemService: StemService) { 
    this.lijstID = Number(sessionStorage.getItem('lijstID'))
    this.gebruikerID = Number(sessionStorage.getItem('gebruikerID'));
  }

  ngOnInit(): void {
    this.vandaag = new Date();
    this.laadLijst();
  }

  //een stem toevoegen aan de lokale variabele
  addStem(id){
    this.itemID = id;
  }

  //de lijst ophalen
  laadLijst(){
    this._lijstService.getLijstDetail(this.lijstID).subscribe(result => {
      this.lijst = result;
      var eind : Date = new Date(this.lijst.eindDatum);
      var start : Date = new Date(this.lijst.startDatum);
      //kijken of het voorbij is
      if(eind > this.vandaag){
        this.voorbij = true;
      } else {
        this.voorbij = false;
      }
      //kijken of het al gestart is
      if (start < this.vandaag){
        this.bezig = true;
      } else {
        this.bezig = false;
      }
    });
    //kijken of er al opgestemd is door u
    this._stemService.checkStem(this.lijstID, this.gebruikerID).subscribe(result => {
      this.alGestemd = result.valueOf();
      if(this.alGestemd == false) {
        this.alGestemd = false;
      } else{
        this.alGestemd = true;
      }
    })
  }

  //de stem toevoegen zolang de gebruiker is ingelogd
  stemLijst(){
    if(this.gebruikerID != 0){
      if(this.itemID != null){
        var stem: Stem = new Stem(0, this.itemID, this.gebruikerID, null, null);
        this.leeg = false;
        this._stemService.addStem(stem).subscribe(result => {
          this.router.navigate(['dashboard'], {replaceUrl: true});
        })
      } else{
        this.leeg = true;
      }
    } else{
      this.router.navigate(['login'], {replaceUrl: true});
    }
  }
}
